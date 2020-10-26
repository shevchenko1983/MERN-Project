const {Router} = require('express');
//Create router
const router = Router();

//Create requests /api/auth/register
router.post('/register', async (req, res) => {
    try{
        //Payload {email, password}
        const {email, password} = req.body;
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