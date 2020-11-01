const {Router} = require('express');
//include crypting for password
const bcrypt = require('bcryptjs');
//include values validation form 'express-validator'
const {check, validationResult} = require('express-validator');
//include jsonwebtoken for Login
const jwt = require('jsonwebtoken');
//include config
const config = require('config');

//Create router
const router = Router();

//Connect User Model
const User = require('../models/User');

//User registration
//Create requests /api/auth/register
router.post(
    '/register',
    [
      check('email', "Not Correct Email").isEmail(),
      check('password',"Password length should be more then 6 symbols").isLength({min: 7})
    ],
    async (req, res) => {

    try{

        //:TODO Start validation of Email and password
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Not Valid email or password"
            })
        }
            
        //Payload {email, password}
        const {email, password} = req.body;
        console.log(JSON.stringify(req.body));
        //Check if user with this email already exists
        const candidate = await User.findOne({email});
        console.log("Candidate", candidate);
        if(candidate){
            return res.status(400).json({message: "User with this email already exists"});
        }
        //Encrypting the user password //bcryptjs
        const hashPassword = await bcrypt.hash(password, 12);
        //:TODO create the new User
        const user = new User({email, password: hashPassword});
        await user.save();

    }catch (e) {
        res.status(500).json({message: "Smth wrong, try please again..."});
    }
});


//User login
//Create requests /api/auth/login
router.post(
    '/login',
    [
        check('email', "Not Correct Email").isEmail(),
        check('password',"Password length should be more then 6 symbols").isLength({min: 7})
    ],
    async (req, res) => {

    try{

        //:TODO Start validation of Email and password
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Not Valid email or password"
            })
        }

        //Payload {email, password}
        const {email, password} = req.body;

        //Check if user with this email already exists
        const user = await User.findOne({email});
        //Check the encrypted password
        const isMatchPassword = await bcrypt.compare(password, user.password);

        if(!user || !isMatchPassword){
            return res.status(400).json({message: "Incorrect email or password - user doesn't exists"});
        }

        //:TODO Create Token JWT
        const token = jwt.sign(
            {userId: user.id},
            config.get('secretKeyJWT'),
            {expiresIn: '1h'}
        );

        res.status(200).json(
            console.log({
                token: token,
                email: user.email
            })
        );


    }catch (e) {
        res.status(500).json({message: "Smth wrong, try please again..."});
    }
})

//Export router
module.exports = router;