import * as Realm from "realm-web";
const {
    BSON: { ObjectId },
} = Realm;

const config = {
    appId: "hotaru_app-ygcyd",
    appUrl: "https://services.cloud.mongodb.com/groups/66160bee62131f7b08ed2cac/apps/6617a0f263d94d53574d4aab",
    baseUrl: "https://services.cloud.mongodb.com",
    clientApiBaseUrl: "https://ap-southeast-2.aws.services.cloud.mongodb.com",
    dataApiBaseUrl: "https://ap-southeast-2.aws.data.mongodb-api.com",
    dataExplorerLink:
        "https://cloud.mongodb.com/links/66160bee62131f7b08ed2cac/explorer/Hotaru/database/collection/find",
    dataSourceName: "mongodb-atlas",
    databaseName: "HOTARU_APP",
};

export default class Database {
    app;
    user;
    db;
    token;
    constructor() {
        this.app = new Realm.App({ id: config.appId, baseUrl: config.baseUrl });
    }

    async logIn(credential = { username: "lhinxue@gmail.com", password: "lhc1130" }) {
        try {
            await this.app.logIn(Realm.Credentials.emailPassword(credential.username, credential.password));

            console.log(666);
            let resp = await this.app.currentUser
                .mongoClient("mongodb-atlas")
                .db("HOTARU_APP")
                .collection("ExchangeRates")
                .find({});
            //https://ap-southeast-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/hotaru_app-ygcyd/functions/call
            //https://ap-southeast-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/hotaru_app-ygcyd/functions/call

            // const myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Access-Control-Request-Headers", "*");
            // myHeaders.append("Accept", "application/json");
            // myHeaders.append("email", "lhinxue@gmail.com");
            // myHeaders.append("password", "lhc1130");

            // const raw = JSON.stringify({
            //     dataSource: "Hotaru",
            //     database: "HOTARU_APP",
            //     collection: "ExchangeRates",
            // });

            // const requestOptions = {
            //     method: "POST",
            //     headers: myHeaders,
            //     body: raw,
            //     redirect: "follow",
            // };

            // fetch("https://data.mongodb-api.com/app/data-sgoib/endpoint/data/v1/action/find", requestOptions)
            //     .then((response) => response.text())
            //     .then((result) => console.log(result))
            //     .catch((error) => console.error(error));
            return true;
        } catch (error) {
            return false;
        }
    }

    useCollection(collection) {
        return this.app.currentUser.mongoClient(config.dataSourceName).db(config.databaseName).collection(collection);
    }

    connect() {
        // this.db = this.app.currentUser.mongoClient("Hotaru").db("HOTARU_APP");
    }

    async find(table, query = {}) {
        const { condition, projection, sort, limit } = query;
        return await this.useCollection(table).find(condition, { projection, sort, limit });
    }

    async insert(table, data) {
        return await this.useCollection(table).insertMany(data);
    }

    // async upsert(table,query){
    //     const { condition, projection, sort, limit } = query;
    //     return await this.db.collection(table).updateMany(filter,)
    // }
}
