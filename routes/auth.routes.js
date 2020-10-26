const {Router} = require('express');
const bcrypt = require('bcryptjs');
//Create router
const router = new Router();

//Connect User Model
const User = require('../models/User');
//User registration
//Create requests /api/auth/register
router.post('/register', async (req, res) => {
    try{
        //Payload {email, password}
        const {email, password} = req.body;
        //Check if user with this email already exists
        const candidate = await User.findOne({email});
        if(candidate){
            return res.status(400).json({message: "User with this email already exists"});
        }
        //Encrypting the user password //bcryptjs
        const hashPassword = await bcrypt.hash(password, 12);
        //create the new User
        const user = new User({email, password: hashPassword});
        await user.save();

    }catch (e) {
        res.status(500).json({message: "Smth wrong, try please again..."});
    }
})
//Create requests /api/auth/login
router.post('/login', async (req, res) => {
    try{

    }catch (e) {
        res.status(500).json({message: "Smth wrong, try please again..."});
    }
})

//Export router
module.exports = router;