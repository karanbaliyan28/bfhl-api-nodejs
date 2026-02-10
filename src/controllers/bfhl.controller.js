const math = require("../utils/math");
const askAI = require("../utils/ai");
const { EMAIL } = require("../config/env");

exports.handle = async (req,res,next)=>{
 try{
  const key = Object.keys(req.body)[0];
  const value = req.body[key];

  let result;

  if(key==="fibonacci") result = math.fibonacci(value);
  else if(key==="prime") result = math.primes(value);
  else if(key==="lcm") result = math.lcmArray(value);
  else if(key==="hcf") result = math.hcfArray(value);
  else if(key==="AI") result = await askAI(value);
  else {
    const error = new Error("Unsupported operation");
    error.statusCode = 400;
    throw error;
  }

  res.status(200).json({
    is_success:true,
    official_email:EMAIL,
    data:result
  });

 }catch(err){ next(err); }
};
