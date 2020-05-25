interface TokenType {
  admin: boolean;
  email: string;
  exp: number;
  iat: number;
  userType: string;
  userId: string;
}
declare namespace Express {
  interface Request {
    decrypted?: TokenType;
  }
}
