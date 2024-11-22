const express=require('express');
require('./DB/config')

const User=require('./DB/User');

const Convention=require('./DB/ConventionalReq');

const Transfer=require('./DB/TransferReq');
const app=express();
const LandForSale=require('./DB/LandSale')

const cors=require('cors');
app.use(express.json());
app.use(cors());

//sign up page
// app.post('/signin', async(req,resp)=>{
//     const user= new User(req.body);
//     const data=await user.save();
// });
app.post('/signin', async (req, resp) => {
    try {
        const user = new User(req.body); // Saves all fields: name, email, adhar_no, age, password
        const data = await user.save();
        resp.status(201).json({ message: 'Sign-up successful', user: data });
    } catch (error) {
        resp.status(500).json({ error: 'An error occurred during sign-up' });
    }
});





// Store either conventional or transfer request in MongoDB
app.post('/userpage', async (req, resp) => {
    try {
        if (req.body.requestType === 'conventional') {
            // Handle ConventionalReq
            const conventionalRequest = new Convention(req.body);
            const data = await conventionalRequest.save();
            resp.status(201).json({ message: 'Conventional request saved successfully', data });
        } else if (req.body.requestType === 'transfer') {
            // Handle TransferReq
            const transferRequest = new Transfer(req.body);
            const data = await transferRequest.save();
            resp.status(201).json({ message: 'Transfer request saved successfully', data });
        } else {
            resp.status(400).json({ error: 'Invalid request type' });
        }
    } catch (error) {
        resp.status(500).json({ error: 'Failed to save request' });
    }
});






//store conventional request in mongodb
// app.post('/userpage',async(req,resp)=>{
//     const land=new Convention(req.body);
//     const data=await land.save();
// });
// app.get('/make_convention', async(req,resp)=>{
//     const land=await Convention.find({});
//     resp.send(land);
// })
// app.delete('/make_convention/:SurveyNo/:HissNo',async (req,resp)=>{
//     const SurveyNo=parseInt(req.params.SurveyNo,10);
//     const {HissNo}=req.params;
//     const  land=await Convention.findOneAndDelete({SurveyNo,HissNo});
   
// })



app.post('/login', async (req, resp) => {
    const { adhar_no, password } = req.body;
    try {
        const user = await User.findOne({ adhar_no, password });
        if (user) {
            resp.status(200).json({ message: 'Login successful', user });
        } else {
            resp.status(401).json({ message: 'Invalid Aadhaar or password' });
        }
    } catch (error) {
        resp.status(500).json({ error: 'Login failed due to an error' });
    }
});






app.get('/make_convention', async (req, resp) => {
    try {
        const land = await Convention.find({});
        resp.status(200).json(land);
    } catch (error) {
        resp.status(500).json({ error: 'Failed to fetch conventional requests' });
    }
});

// Delete a conventional request by SurveyNo and HissNo
app.delete('/make_convention/:SurveyNo/:HissNo', async (req, resp) => {
    try {
        const SurveyNo = parseInt(req.params.SurveyNo, 10);
        const { HissNo } = req.params;
        const land = await Convention.findOneAndDelete({ SurveyNo, HissNo });
        
        if (land) {
            resp.status(200).json({ message: 'Request deleted successfully' });
        } else {
            resp.status(404).json({ error: 'Request not found' });
        }
    } catch (error) {
        resp.status(500).json({ error: 'Failed to delete conventional request' });
    }
});






//store transfer request in mongodb
// app.post('/userpage',async(req,resp)=>{
//     const land=new Transfer(req.body);
//     const data=await land.save();
// })
// app.get('/make_transfer', async(req,resp)=>{
//     const land=await Transfer.find({});
//     resp.send(land);
// })
// app.delete('/make_transfer/:SurveyNo/:HissNo',async (req,resp)=>{
//     const SurveyNo=parseInt(req.params.SurveyNo,10);
//     const {HissNo}=req.params;
//     const  land=await Transfer.findOneAndDelete({SurveyNo,HissNo});
   
// })


// Get all transfer requests
app.get('/make_transfer', async (req, resp) => {
    try {
        const land = await Transfer.find({});
        resp.status(200).json(land);
    } catch (error) {
        resp.status(500).json({ error: 'Failed to fetch transfer requests' });
    }
});

// Delete a transfer request by SurveyNo and HissNo
app.delete('/make_transfer/:SurveyNo/:HissNo', async (req, resp) => {
    try {
        const SurveyNo = parseInt(req.params.SurveyNo, 10);
        const { HissNo } = req.params;
        const land = await Transfer.findOneAndDelete({ SurveyNo, HissNo });
        
        if (land) {
            resp.status(200).json({ message: 'Transfer request deleted successfully' });
        } else {
            resp.status(404).json({ error: 'Transfer request not found' });
        }
    } catch (error) {
        resp.status(500).json({ error: 'Failed to delete transfer request' });
    }
});



// app.get('/landforsale', async(req,resp)=>{
//     const land=await Transfer.find({});
//     resp.send(land);
// })




app.post('/landforsale', async (req, res) => {
    const { SurveyNo, HissNo, area, conventional, pincode, name, email, price } = req.body;
    try {
        const landSaleEntry = new LandForSale({ SurveyNo, HissNo, area, conventional, pincode, name, email, price });
        await landSaleEntry.save();
        res.status(201).json({ message: "Land added for sale" });
    } catch (error) {
        res.status(500).json({ message: "Error adding land for sale" });
    }
});

// Get all lands for sale
app.get('/landforsale', async (req, res) => {
    try {
        const landsForSale = await LandForSale.find({});
        res.json(landsForSale);
    } catch (error) {
        res.status(500).json({ message: "Error fetching land sale records" });
    }
});


// Delete land for sale by SurveyNo and HissNo
app.delete('/landforsale/:surveyNo/:hissNo', async (req, res) => {
    const { surveyNo, hissNo } = req.params;
    try {
        await LandForSale.deleteOne({ SurveyNo: surveyNo, HissNo: hissNo });
        res.json({ message: 'Land for sale entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting land for sale entry' });
    }
});







app.listen(5000);