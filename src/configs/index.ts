import jwtConfig, { JwtConfigOptions } from './jwt.config';
import manualConfig, { ManualConfigOptions } from './manual.config';

enum ConfigEnum {
  MANUAL = 'manual',
  JWT = 'jwt',
}

export {
  manualConfig,
  jwtConfig,
  JwtConfigOptions,
  ConfigEnum,
  ManualConfigOptions,
};
