const mongoose=require('mongoose');

const TransferSchema=new mongoose.Schema({
    'owner_adhar':Number,
    'buyer_adhar':Number,
    'SurveyNo':Number,
    'HissNo':String,
    'area':Number,
    'conventional':Boolean,
    'pincode':Number
});

module.exports=mongoose.model("TransferReq",TransferSchema);