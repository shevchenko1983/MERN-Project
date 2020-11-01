console.log("Start App!");
//: TODO include express
const express = require('express');

//:TODO init express app
const app = express();
//For recognize body
app.use(express.json({extended: true}));
//Create Auth EndPoint => '/api/auth'
app.use('/api/auth', require('./routes/auth.routes'));

//: TODO include config
const config = require('config');
const PORT = config.get('port') || 5000;
const DB_URI = config.get('mongoDbURI');

//: TODO include MongoDB from mongoose
const mongoose = require('mongoose');
//Connect to DB
async function connectToDb(){
    try{
        //URL, options, callback
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`Application has been started on ${PORT}`));
    }catch (e) {
        console.log('Server Error', e.message);
        process.exit(0);
    }
}
connectToDb();



