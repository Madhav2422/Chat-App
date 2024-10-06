const express=require("express");
const dotenv=require("dotenv");

const { chats } = require("./data/data");


const app=express()
dotenv.config();

//PORT
const PORT=process.env.PORT||5000

app.get("/",(req,res) => {
    res.send("Api is working");
})

app.get("/api/chats",(req,res)=>{
    res.send(chats);
})

app.get("/api/chats/:id",(req,res)=>{
    // console.log(req.params.id);
    const singleChat=chats.find((c)=>c._id === req.params.id);
    res.send(singleChat);

})

app.listen(4000,  console.log  (` App is listening on port ${PORT} `));