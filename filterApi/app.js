import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/index.js";

// create app
const app = express();

// use middleware
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// import routes
import userRoutes from "./routes/userRoute.js";

// declaration routess
app.use("/api/v1", userRoutes);


// app.get('/users',(req, res) => res.send('ok'))


//db connection
connectDB()
  .then(() => {
    // listening server
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
