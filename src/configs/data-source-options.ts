import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

const CONNECTION_TYPE = 'postgres';

const getDataSourceOptions = (
  host = process.env.POSTGRES_HOST,
): DataSourceOptions => ({
  type: CONNECTION_TYPE,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  host,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  migrationsRun: true,
});

export { getDataSourceOptions };
