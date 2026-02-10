const { API_KEY, EMAIL } = require("../config/env");

module.exports=(req,res,next)=>{
 const key = req.headers["x-api-key"];

 if(!API_KEY){
  return res.status(500).json({
   is_success:false,
   official_email:EMAIL,
   error:"API key auth is not configured"
  });
 }

 if(key!==API_KEY){
  return res.status(401).json({
   is_success:false,
   official_email:EMAIL,
   error:"Unauthorized"
  });
 }

 next();
};
