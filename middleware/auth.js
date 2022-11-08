const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next){
// gets token from header 
const token = req.header('x-auth-token');

if(!token){

    res.status(401).json({ msg :'No token, authorization denied'});

}

// verify the token
try{
const decoded =jwt.verify(token, config.get('jwtSecret'));
req.user = decoded.user;

}catch(err) {

    res.status(401).json({msg: 'Token is not valid'})


}


 

}