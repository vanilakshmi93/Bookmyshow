const express =require('express');
const app= express();
require('dotenv').config();
const connectDB=require('./config/dbconfig');
const userRouter = require('./routes/userRoute'); // Import user routes

console.log("server",process.env.DB_URL);
connectDB();

/** Routes */
app.use(express.json());
app.use('/api/users', userRouter);


app.listen(8088,()=>{
    console.log('server is running')
});