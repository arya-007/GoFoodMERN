const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

// router.post('./orderData', async(req,res)=>{
//     let data=req.body.order_data;
//     await data.splice(0,0,{Order_Date:req.body.order_date})

//     let eid= await Order.findOne({email:req.body.email})

//     console.log(eid);

//     if(eid===NULL){
//         try{
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(()=>{
//                 res.json({success: true})
//             })
//         }catch(error){
//             console.log(error.message)
//             res.send("Server Error",error.message);
//         }
//     }
//     else{
//         try{
//             await Order.findOneAndUpdate({email: req.body.email},
//             { $push: {order_data:data}}).then(()=>{
//                 res.json({success:true})
//             })
//         }catch(error){
//             res.send("Server Error",error.message)
//         }
//     }

// });




router.post('/orderData', async (req, res) => {
    //console.log(req.body); // Log the entire request body to check if email is present

    let data = req.body.order_data;
    let Order_Date = req.body.order_date;
    data = {
        data: data,
        Order_Date : Order_Date
    }
    // await data.splice(0, 0, { Order_Date: req.body.order_date });
    console.log("hello");
    console.log(data);

    let email = req.body.email; // Extract email from request body

    try {
        let existingOrder = await Order.findOne({ email });
        if (!existingOrder) {
            await Order.create({
                email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate({ email }, { $push: { order_data: data } });
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});



router.post('/myOrderData', async (req, res) => {
    try {
        //console.log(req.body.email)
        let myData = await Order.findOne({ 'email': req.body.email })
        //console.log(myData)
        res.json({orderData:myData})
    } catch (error) {
        res.status(404).send(error.message);
    }
    

});








module.exports = router;