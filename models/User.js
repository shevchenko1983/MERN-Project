const {Schema, model, ObjectId, Types} = require('mongoose');

//Create schema for User Object
const userSchema = new Schema({
    userId: ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}] //ref: "Link" -> name of the future model for user
});

//Export model(User)
module.exports = model("User", userSchema);