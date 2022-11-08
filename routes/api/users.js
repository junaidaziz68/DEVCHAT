const express = require('express');
const router = express.Router();
const gravatar=require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../../models/Users')

//@Router Post api/users
// @desc Register user
//@acess Public
// @body is a validator which allows us to validate name,password and email
router.post('/',
body('name','Name is required').not().isEmpty(),
body('email','Please include valid email ').isEmail(),
body('password', 'Please enter a password with 6 or more characters').isLength({min:6}),
 async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     res.status(400).json({errors: errors.array()});
}

const {name,email,password} = req.body;

    try{

        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'User already exists'}]});
        }



    const avatar = gravatar.url(email,{
       s:'200',
       r:'pg',
       d:'nm'
    })


    user = new User({
        name,
        email,
        avatar,
        password
    });
    // get users gravatar



    // Encrypt password 
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    
    //return json web token

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
