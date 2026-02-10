const { EMAIL } = require("../config/env");

exports.check = (req,res)=>{
 res.status(200).json({
  is_success:true,
  official_email:EMAIL
 });
};
