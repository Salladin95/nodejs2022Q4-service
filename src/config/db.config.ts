import { registerAs } from '@nestjs/config';

const CONNECTION_TYPE = 'postgres';

export default registerAs('typeorm', () => {
  return {
    type: CONNECTION_TYPE,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: true,
    entities: [],
  };
});
