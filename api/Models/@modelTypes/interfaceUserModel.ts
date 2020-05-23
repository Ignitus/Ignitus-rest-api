import { Document } from 'mongoose';

export interface InterfaceUserModel extends Document {
  _id: string;
  email: string;
  password: string;
  userType: string;
  verifyToken?: number;
  isUserVerified?: number;
  admin?: boolean;
  linkedin: linkedinType;
  resetPasswordToken?: string;
  resetPasswordExpiration?: Date;
  createdAt: Date;
  modifiedAt: Date;
}

type linkedinType = {
  profileUrl?: string;
  accessToken?: string;
};
