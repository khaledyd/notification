const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const  bodyParser = require('body-parser')

const app = express();


dotenv.config(); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  }).then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.use("/api/auth",authRoute );
app.use("/api/users", userRoute);



app.listen("3000", () => {
  console.log("Backend is running.");
});

