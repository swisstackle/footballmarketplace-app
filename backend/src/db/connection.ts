import { DataSource } from 'typeorm';
import logger from '../logger';
export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DBPORT || 5432),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/db/entities/*.js'],
  logging: true,
  synchronize: true
});
