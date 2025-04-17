import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'postgres',
    port: +process.env.POSTGRES_PORT! || 5433,
    username: process.env.POSTGRES_USER || 'seunayo',
    password: process.env.POSTGRES_PASSWORD || 'mts121101',
    database: process.env.POSTGRES_DB || 'uberv2',
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
    synchronize: true,
    ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };
  
  const dataSource = new DataSource(dataSourceOptions);
  
  export default dataSource;