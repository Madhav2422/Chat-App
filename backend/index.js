const express = require("express");
const dotenv = require("dotenv");

const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors=require("colors")


const app = express()
dotenv.config();

//Connect to Database
connectDB()


//PORT
const PORT = process.env.PORT || 5000


// User routes
app.use('/api/user',userRoutes);

app.listen(4000, console.log(` App is listening on port ${PORT} `.yellow.bold));