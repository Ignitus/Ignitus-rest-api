import { Schema, model, Model } from 'mongoose';
import { InterfaceUserModel } from './@modelTypes/interfaceUserModel';

const userSchema = new Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  about: { type: String, default: null },
  education: {
    school: { type: String, default: null },
    degree: { type: String, default: null },
    fieldOfStudy: { type: String, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    grade: { type: String, default: null },
    description: { type: String, default: null },
    media: { type: String, default: null },
  },
  experience: [
    {
      title: { type: String, default: null },
      employmentType: { type: String, default: null },
      organization: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      grade: { type: String, default: null },
      description: { type: String, default: null },
      media: { type: String, default: null },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  },
  firstName: { type: String, default: null },
  followers: [{ type: String }],
  following: [{ type: String }],
  isUserVerified: { type: Boolean, default: false },
  location: {
    country: { type: String, default: null },
    city: { type: String, default: null },
    province: { type: String, default: null },
  },
  lastName: { type: String, default: null },
  oAuth: {
    linkedIn: {
      profileUrl: { type: String, default: null },
      accessToken: { type: String, default: null },
    },
    google: {
      profileUrl: { type: String, default: null },
      accessToken: { type: String, default: null },
    },
  },
  publication: [
    {
      name: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      description: { type: String, default: null },
      tags: [{ type: String }],
      link: { type: String, default: null },
    },
  ],
  password: { type: String, required: true },
  profileAvatar: { type: String, default: null },
  recommendation: {
    received: [
      {
        by: { type: String },
        content: { type: String },
        date: { type: Date },
      },
    ],
    given: [
      {
        to: { type: String },
        content: { type: String },
        date: { type: Date },
      },
    ],
  },
  researchArea: [{ type: String }],
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpiration: { type: Date, default: null },
  socialProfiles: {
    linkedIn: { type: String, default: null },
    google: { type: String, default: null },
    facebook: { type: String, default: null },
    github: { type: String, default: null },
    twitter: { type: String, default: null },
    website: { type: String, default: null },
    blogs: { type: String, default: null },
    researchGate: { type: String, default: null },
  },
  shortHeadline: { type: String, default: null },
  userName: {
    type:String,
    required: true,
    unqiue: true,
    match: /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
  },
  userType: { type: String, required: true },
  verifyToken: { type: String, default: null },
});

export const User: Model<InterfaceUserModel> = model<InterfaceUserModel>(
  'User',
  userSchema,
);
