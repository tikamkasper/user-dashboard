import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfessionalBackgroundSchema = new Schema({
  Company: String,
  Title: String,
  StartDate: String,
  EndDate: String,
  Description: String,
  Location: String,
});

const AcademicExperienceSchema = new Schema({
  School: String,
  Degree: String,
  FieldOfStudy: String,
  StartDate: String,
  EndDate: String,
  Description: String,
});

const VolunteeringExperienceSchema = new Schema({
  Title: String,
  Organization: String,
  Cause: String,
  StartDate: String,
  EndDate: String,
  Description: String,
});

const userSchema = new Schema({
  Name: String,
  FirstName: String,
  LastName: String,
  Email: String,
  EmailStatus: String,
  Title: String,
  Linkedin: String,
  Location: String,
  AddedOn: String,
  CompanyName: String,
  CompanyDomain: String,
  CompanyWebsite: String,
  CompanyEmployeeCount: Number,
  CompanyEmployeeCountRange: String,
  CompanyIndustry: String,
  CompanyType: String,
  CompanyHeadquarters: String,
  CompanyRevenueRange: String,
  CompanyLinkedinUrl: String,
  CompanyCrunchbaseUrl: String,
  CompanyFundingRounds: Number,
  CompanyLastFundingRoundAmount: String,
  CompanyLogoUrlPrimary: String,
  CompanyLogoUrlSecondary: String,
  FULLNAME: String,
  DATEOFBIRTH: String,
  LOCATION: String,
  HEADLINE: String,
  SUMMARY: String,
  PROFESSIONALBACKGROUND: [ProfessionalBackgroundSchema],
  ACADEMICEXPERIENCE: [AcademicExperienceSchema],
  PROJECTS: [Schema.Types.Mixed],
  ACHIEVEMENTS: [Schema.Types.Mixed],
  LANGUAGES: [String],
  PUBLICATIONS: [Schema.Types.Mixed],
  SKILLS: [String],
  VOLUNTEERINGEXPERIENCE: [VolunteeringExperienceSchema],
  CONNECTIONS: String,
  RECOMMENDATIONS: [Schema.Types.Mixed],
});

const User = mongoose.model('User', userSchema);
export{User};