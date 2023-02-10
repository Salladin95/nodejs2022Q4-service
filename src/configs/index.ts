import ormconfig from './ormconfig';
import manualConfig, { ManualConfigOptions } from './manual.config';

enum ConfigEnum {
  ORMCONFIG = 'ormconfig ',
  MANUAL = 'manual',
}

export { ormconfig, manualConfig, ConfigEnum, ManualConfigOptions };
