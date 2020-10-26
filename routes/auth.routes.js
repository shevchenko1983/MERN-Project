const {Router} = require('express');
//include crypting for password
const bcrypt = require('bcryptjs');
//include values validation form 'express-validator'
const {check, validationResult} = require('express-validator');

//Create router
const router = new Router();

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
        //Check if user with this email already exists
        const candidate = await User.findOne({email});
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






//Create requests /api/auth/login
router.post('/login', async (req, res) => {
    try{

    }catch (e) {
        res.status(500).json({message: "Smth wrong, try please again..."});
    }
})

//Export router
module.exports = router;