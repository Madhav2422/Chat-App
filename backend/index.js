const express = require("express");
const dotenv = require("dotenv");

const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors=require("colors")
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");


const app = express()
dotenv.config();

//Connect to Database
connectDB()

// Accept Json data from Frontend
app.use(express.json());

//PORT
const PORT = process.env.PORT || 5000


// User routes
app.use('/api/user',userRoutes);
app.use("/api/chat",chatRoutes);

//Error Handling MiddleWares
app.use(notFound);
app.use(errorHandler);

app.listen(4000, console.log(` App is listening on port ${PORT} `.yellow.bold));