
import * as Realm from "realm-web";
const {
    BSON: { ObjectId },
  } = Realm;

export default class Database {
    app;
    user;
    db;
    constructor() {
        this.app = new Realm.App({ id: "data-szdlo" });
    }

    async logIn(credential) {
        try {
            this.user = await this.app.logIn(Realm.Credentials.emailPassword(credential.username, credential.password));
            return true;
        } catch (error) {
            return false;
        }
    }

    connect() {
        this.db = this.app.currentUser
            .mongoClient("")
            .db("");
    }

    async find(table, query) {
        const { condition, projection, sort, limit } = query;
        return await this.db.collection(table).find(condition, { projection, sort, limit });
    }

    async insert(table, data) {
        return await this.db.collection(table).insertMany(data);
    }

    // async upsert(table,query){
    //     const { condition, projection, sort, limit } = query;
    //     return await this.db.collection(table).updateMany(filter,)
    // }
}