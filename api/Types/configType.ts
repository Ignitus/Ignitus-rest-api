import { HexBase64Latin1Encoding } from 'crypto';

export type ConfigType = {
  secretKey: string;
  mongoUrl: string;
  hashingType: string;
  hashingDigest: HexBase64Latin1Encoding | any;
};
