const { Pool } = require("pg");

module.exports = new Pool({
    user: 'postgres',
    password: "3881314ccfc84fc5ab0d99a55eacacd5",
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
});