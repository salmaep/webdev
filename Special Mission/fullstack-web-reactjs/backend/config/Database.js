// buat koneksi

import { Sequelize } from "sequelize";

const db = new Sequelize('crud_db_react','root','',{
    host : '127.0.0.1',
    dialect : 'mysql'
});

export default db;