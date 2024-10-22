const crypto = require('crypto');
const jwt = require('jsonwebtoken');

key = crypto.randomBytes(16).toString('base64');

var token = jwt.sign(
  {},
  key
);

console.log(token);

try{
  const decoded = jwt.verify(token,key);
  console.log(decoded);
}catch(err){
  console.log(err);
}