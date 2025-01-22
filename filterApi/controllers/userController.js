import { User } from "../models/userModel.js";

export const getAlluser = async (req, res) => {
  try {
    const users = await User.find({ Email: "kalpana@appcito.net" });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const filterUser= async (req, res) => {
//     try {
//       const filters = req.query;
//       const users = await User.find(filters);
//       res.status(200).json({success:true,users});
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }



export const filterUser= async (req, res) => {

  console.log("=====req.query",req.query)

  const { q="", ...fields } = req.query;

  
// Helper function to build regex filters for a sentence
const buildFilters = (sentence) => {
  const words = sentence.split(' ').map(word => word.trim());
  const regexFilters = words.map(word => ({
    $or: [
      { Name: new RegExp(word, 'i') },
      { FirstName: new RegExp(word, 'i') },
      { LastName: new RegExp(word, 'i') },
      { Email: new RegExp(word, 'i') },
      { EmailStatus: new RegExp(word, 'i') },
      { Title: new RegExp(word, 'i') },
      { Linkedin: new RegExp(word, 'i') },
      { Location: new RegExp(word, 'i') },
      { AddedOn: new RegExp(word, 'i') },
      { CompanyName: new RegExp(word, 'i') },
      { CompanyDomain: new RegExp(word, 'i') },
      { CompanyWebsite: new RegExp(word, 'i') },
      { CompanyIndustry: new RegExp(word, 'i') },
      { CompanyType: new RegExp(word, 'i') },
      { CompanyHeadquarters: new RegExp(word, 'i') },
      { CompanyRevenueRange: new RegExp(word, 'i') },
      { CompanyLinkedinUrl: new RegExp(word, 'i') },
      { CompanyCrunchbaseUrl: new RegExp(word, 'i') },
      { FULLNAME: new RegExp(word, 'i') },
      { DATEOFBIRTH: new RegExp(word, 'i') },
      { LOCATION: new RegExp(word, 'i') },
      { HEADLINE: new RegExp(word, 'i') },
      { SUMMARY: new RegExp(word, 'i') },
      { 'PROFESSIONALBACKGROUND.Company': new RegExp(word, 'i') },
      { 'PROFESSIONALBACKGROUND.Title': new RegExp(word, 'i') },
      { 'ACADEMICEXPERIENCE.School': new RegExp(word, 'i') },
      { 'ACADEMICEXPERIENCE.Degree': new RegExp(word, 'i') },
      { 'VOLUNTEERINGEXPERIENCE.Title': new RegExp(word, 'i') },
      { 'VOLUNTEERINGEXPERIENCE.Organization': new RegExp(word, 'i') },
      { LANGUAGES: new RegExp(word, 'i') },
      { SKILLS: new RegExp(word, 'i') },
    ],
  }));
  return { $or: regexFilters };
};

const filters = buildFilters(q);

//------------
// const newfields=[fields]
// console.log(newfields);


// if(newfields.length!==0){
//   newfields.forEach((field)=>{
//     for (const key in fields) {
//       if (fields[key]) {
//         filters[key] = new RegExp(fields[key], 'i'); // Case-insensitive search
//       }
//     }
//   })
// }
//-----------------


  // Field-based specific filters
  for (const key in fields) {
    if (fields[key]) {
      filters[key] = new RegExp(fields[key], 'i'); // Case-insensitive search
    }
  }

//==============================
//   [ { id: 'FULL NAME', value: 'Pranav ' } ]

// // Field-based specific filters
 
// allfilters.forEach((field) => {
   
//       globlefilters[field.id] = new RegExp(fields[field.value], "i"); // Case-insensitive search
    
//   });

//==========================================


  try {
    const users = await User.find(filters);
    const usersCount=users.length;
    res.json({usersCount,users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}