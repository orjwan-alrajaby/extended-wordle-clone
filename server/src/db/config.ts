const { Sequelize } = require('sequelize');
import { DB_CREDENTIALS } from "../constants/env"

const sequelizeInstance = new Sequelize(DB_CREDENTIALS.DB_NAME, DB_CREDENTIALS.DB_USERNAME, DB_CREDENTIALS.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelizeInstance;