const mongoose= require('mongoose');

const UserSchema= new mongoose.Schema({
    'name':String,
    'email':String,
    'adhar_no':Number,
    'age':Number,
    'password':String
});

module.exports=mongoose.model("user",UserSchema);