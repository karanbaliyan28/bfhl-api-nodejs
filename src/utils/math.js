const badRequestError = (message) => {
 const error = new Error(message);
 error.statusCode = 400;
 return error;
};

const validateIntegerArray = (arr, label) => {
 if(!Array.isArray(arr) || arr.length===0 || !arr.every(Number.isInteger)){
  throw badRequestError(`${label} expects a non-empty array of integers`);
 }
};

exports.fibonacci=n=>{
 if(!Number.isInteger(n)||n<=0||n>1000){
  throw badRequestError("fibonacci must be an integer between 1 and 1000");
 }

 if(n===1) return [0];

 const arr=[0,1];
 for(let i=2;i<n;i++){
  arr[i]=arr[i-1]+arr[i-2];
 }

 return arr;
};

const isPrime=n=>{
 if(n<2) return false;
 for(let i=2;i<=Math.sqrt(n);i++)
  if(n%i===0) return false;
 return true;
};

exports.primes=arr=>{
 validateIntegerArray(arr, "prime");
 return [...new Set(arr)].filter(isPrime);
};

const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);

exports.hcfArray=arr=>{
 validateIntegerArray(arr, "hcf");
 return arr.reduce(gcd);
};

const lcmTwo = (a,b)=>{
 if(a===0 || b===0) return 0;
 return Math.abs(a*b)/gcd(a,b);
};

exports.lcmArray=arr=>{
 validateIntegerArray(arr, "lcm");
 return arr.reduce(lcmTwo);
};
