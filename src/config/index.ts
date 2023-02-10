import dbConfig from './db.config';
import manualConfig, { ManualConfigOptions } from './manual.config';

enum ConfigEnum {
  TYPEORM = 'typeorm',
  MANUAL = 'manual',
}

export { dbConfig, manualConfig, ConfigEnum, ManualConfigOptions };
