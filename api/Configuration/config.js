export const config = {
  secretKey: process.env.SECRET_KEY,
  mongoUrl: process.env.DATABASE_URI,
  hashingType: process.env.HASHING_TYPE,
  hashingDigest: process.env.HASHING_DIGEST,
  privateVapidEmail: process.env.PVT_VAPID_EMAIL,
  publicVapidKey: process.env.PUBLIC_VAPID_KEY,
  privateVapidKey: process.env.PRIVATE_VAPID_KEY,
};
