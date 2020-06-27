import { Document } from 'mongoose';

export interface InterfaceUserModel extends Document {
  admin: boolean;
  about: string;
  education: education;
  experience: experience[];
  email: string;
  firstName: string;
  followers: string[];
  following: string[];
  isUserVerified: boolean;
  location: location;
  lastName: string;
  oAuth: {
    linkedIn: {
      profileUrl: string;
      accessToken: string;
    };
    google: {
      profileUrl: string;
      accessToken: string;
    };
  };
  publication: publication[];
  password: string;
  profileAvatar: string;
  recommendation: recommendation;
  researchArea: string[];
  resetPasswordToken: string;
  resetPasswordExpiration: Date;
  socialProfiles: {
    linkedIn: string;
    google: string;
    facebook: string;
    github: string;
    twitter: string;
    website: string;
    blogs: string;
    researchGate: string;
  };
  shortHeadline: string;
  userName: string;
  userType: string;
  verifyToken: string;
}

type education = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  grade: string;
  description: string;
  media: string;
};

type experience = {
  title: string;
  employmentType: string;
  organization: string;
  startDate: Date;
  endDate: Date;
  grade: string;
  description: string;
  media: string;
};

type location = {
  country: string;
  city: string;
  province: string;
};

type publication = {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  tags: string[];
  link: string;
};

type recommendation = {
  received: [
    {
      by: string;
      content: string;
      date: { type: Date };
    },
  ];
  given: [
    {
      to: string;
      content: string;
      date: { type: Date };
    },
  ];
};
