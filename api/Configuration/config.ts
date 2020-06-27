require('dotenv').config();
import { ConfigType } from 'api/Types/configType';

export const config: ConfigType = {
  secretKey: process.env.SECRET_KEY || '',
  mongoUrl: process.env.DATABASE_URI || '',
  mongoUrlTest: process.env.DATABASE_URI_TEST || '',
};
