import { Sequelize } from 'sequelize';

const db = new Sequelize('te31403', 'root', 'mysql', {
    host: "localhost",
    dialect: "mysql"
});

export default db;