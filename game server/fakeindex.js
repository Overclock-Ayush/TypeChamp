const express = require("express");
const mongoDB = require("./db");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const port=5000;
mongoDB();
const app=express();
app.get("/",(req,res)=>{
    res.send("HELLO server");
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/api",require("./Routes/CreateUser"));


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model("user",UserSchema);
app.post("/createuser",async(req,res)=>{
    try{
        await User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})
const fetched_data = mongoose.connection.db.collection("food_items");
fetched_data.find({}).toArray(function(err,data){
  if(err) console.log(err);
  else{
    console.log(data);
    global.food_items=data;
    console.log(global.food_items);
  } 
})
app.listen(port,()=>{
    console.log("app is listening on port "+port);
});