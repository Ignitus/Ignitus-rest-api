import { ConfigType } from 'api/Types/configType';

export const config: ConfigType = {
  secretKey: process.env.SECRET_KEY || 'my-secret-key',
  mongoUrl:
    process.env.DATABASE_URI ||
    'mongodb+srv://dishebh:12345@cluster0-zpzln.mongodb.net/Ignitus-rest-api?retryWrites=true&w=majority',
};
