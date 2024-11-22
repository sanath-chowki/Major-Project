const mongoose=require('mongoose');

const ConventionalSchema=new mongoose.Schema({
    'owner_adhar':Number,
    'SurveyNo':Number,
    'HissNo':String,
    'area':Number,
   'conventional':Boolean,
    'pincode':Number
});

module.exports=mongoose.model("ConventionalReq",ConventionalSchema);