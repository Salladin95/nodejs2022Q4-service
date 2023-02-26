import { registerAs } from '@nestjs/config';

export type JwtConfigOptions = {
  salt: number;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
};

export default registerAs(
  'jwt',
  (): JwtConfigOptions => ({
    salt: parseInt(process.env.SALT, 10),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  }),
);
