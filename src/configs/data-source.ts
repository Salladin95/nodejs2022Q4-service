import { DataSource } from 'typeorm';
import { getDataSourceOptions } from './data-source-options';

/* for migrations */
const dataSource = new DataSource(getDataSourceOptions('localhost'));

export default dataSource;
