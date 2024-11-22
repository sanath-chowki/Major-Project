const mongoose=require('mongoose');

const LandSale=new mongoose.Schema({
    'SurveyNo':Number,
    'HissNo':String,
    'area':Number,
    'conventional':Boolean,
    'pincode':Number,
    'name':String,
    'email':String,
    'price':Number

});

module.exports=mongoose.model("LandForSale",LandSale);