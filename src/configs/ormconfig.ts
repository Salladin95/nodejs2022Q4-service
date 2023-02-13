import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

import { getDataSourceOptions } from './data-source-options';

/* for practising usage registerAs */
export default registerAs('ormconfig ', (): DataSourceOptions => {
  return getDataSourceOptions();
});
