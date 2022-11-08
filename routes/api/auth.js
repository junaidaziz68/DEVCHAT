const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

//@Router GET api/auth
// @desc Test route
//@acess Public

router.get('/', auth, async(req , res) => {

try{
const user = await User.findById(req.user.id).select('-password');
res.json(user)

}catch(err){

 console.error(err.message)
 res.status(500).send('Server Error')
}
});

//@Router Post api/auth
// @desc Authenitcate and get token
//@acess Public
// @body is a validator which allows us to validate name,password and email
router.post('/',
body('email','Please include valid email ').isEmail(),
body('password', 'Password is required').exists(),
 async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     res.status(400).json({errors: errors.array()});
}

const {email,password} = req.body;

    try{

        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
        return  res.status(400).json({errors:[{msg:'Invalid Credentials'}]}); 

    }

    const payload = {
        user:{
            id:user.id
        }
    }
    // jwt token  to send 
    jwt.sign(payload,
    config.get('jwtSecret'),
    {expiresIn: 360000},
    (err,token)=>{
        if(err) throw err;
        res.json({token});
        


    }
    
    
    );

 

    } catch(err){
        console.error(err.message);
      res.status(500).send('server error');

    }
 

 });




module.exports=router;