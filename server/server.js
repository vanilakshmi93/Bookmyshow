const express = require('express');
const cors=require('cors')
 const app = express();
 require('dotenv').config(); // Load environment variables

 const connectDB = require('./config/dbconfig'); // Import database configuration
 
 const userRouter = require("./routes/userRoute");
  const movieRouter=require('./routes/movieRoute');
 const theatreRouter=require('./routes/theatreRoute')
 const showRouter = require("./routes/showRoute");
 const bookingRouter=require("./routes/bookingRoute")


 //console.log("server",process.env.DB_URL);
 connectDB(); // Connect to database

 /**Routes*/
 app.use(express.json());
 app.use(cors())
 app.use('/api/users',userRouter);
  app.use("/api/movies", movieRouter);
 app.use("/api/theatres", theatreRouter);
 app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);


  app.listen(8080, () => {
 console.log('Server is Running');
 })