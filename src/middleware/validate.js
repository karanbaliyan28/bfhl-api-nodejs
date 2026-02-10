const { EMAIL } = require("../config/env");

const ALLOWED_KEYS = new Set(["fibonacci", "prime", "lcm", "hcf", "AI"]);

const isIntegerArray = (value) =>
 Array.isArray(value) &&
 value.length > 0 &&
 value.every((item) => Number.isInteger(item));

module.exports = (req,res,next)=>{
 if(!req.body || typeof req.body !== "object" || Array.isArray(req.body)){
  return res.status(400).json({
   is_success:false,
   official_email:EMAIL,
   error:"Request body must be a JSON object"
  });
 }

 const keys = Object.keys(req.body);

 if(keys.length!==1){
  return res.status(400).json({
   is_success:false,
   official_email:EMAIL,
   error:"Send exactly one key"
  });
 }

 const key = keys[0];
 const value = req.body[key];

 if(!ALLOWED_KEYS.has(key)){
  return res.status(400).json({
   is_success:false,
   official_email:EMAIL,
   error:`Unsupported key "${key}"`
  });
 }

 if(key==="fibonacci"){
  if(!Number.isInteger(value) || value<=0 || value>1000){
   return res.status(400).json({
    is_success:false,
    official_email:EMAIL,
    error:"fibonacci must be an integer between 1 and 1000"
   });
  }
 }

 if(key==="prime" || key==="lcm" || key==="hcf"){
  if(!isIntegerArray(value)){
   return res.status(400).json({
    is_success:false,
    official_email:EMAIL,
    error:`${key} expects a non-empty array of integers`
   });
  }
 }

 if(key==="AI"){
  if(typeof value!=="string" || value.trim().length===0){
   return res.status(400).json({
    is_success:false,
    official_email:EMAIL,
    error:"AI expects a non-empty string prompt"
   });
  }
 }

 next();
};
