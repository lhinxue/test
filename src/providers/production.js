import { compareSync, genSaltSync, getSalt, hashSync } from "bcryptjs";

function authenticate() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        key: process.env.REACT_APP_MONGODB_API_KEY,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_MONGODB_URL}/auth/providers/api-key/login`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function testfetch() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append("api-key", process.env.REACT_APP_MONGODB_API_KEY);
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        dataSource: process.env.REACT_APP_MONGODB_DATASOURCE,
        database: process.env.REACT_APP_MONGODB_DATABASE,
        collection: "test1",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_MONGODB_URL}/action/find`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function createTestUser() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append("api-key", process.env.REACT_APP_MONGODB_API_KEY);
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        dataSource: process.env.REACT_APP_MONGODB_DATASOURCE,
        database: process.env.REACT_APP_MONGODB_DATABASE,
        collection: "USERS",
        document: {
            _id: "admin",
            password: hashSync("test", genSaltSync()),
        },
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_MONGODB_URL}/action/insertOne`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function authenticateUser(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append("api-key", process.env.REACT_APP_MONGODB_API_KEY);
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        dataSource: process.env.REACT_APP_MONGODB_DATASOURCE,
        database: process.env.REACT_APP_MONGODB_DATABASE,
        collection: "USERS",
        filter: {
            _id: username,
        },
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_MONGODB_URL}/action/findOne`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            result = JSON.parse(result);
            if (compareSync(password, result.document.password)) {
                console.log("login");
            } else {
                console.log("fail");
            }
        })
        .catch((error) => console.error(error));
}

export { authenticate, testfetch, createTestUser, authenticateUser };
