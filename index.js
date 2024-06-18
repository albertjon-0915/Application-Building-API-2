const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./Routes/Users.js");
const moviesRoutes = require("./Routes/Movies.js");

const app = express();

const corsOptions = {
     origin: ["http://localhost:4000", 'http://localhost:3000','https://application-building-full-stack-react-2.vercel.app', 'https://application-building-api-2.onrender.com'],
     credentials: true,
     optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
     "mongodb+srv://admin:admin123@appbuildingapi1.xk4oims.mongodb.net/moviesApp?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => console.log("Connected to mongoDB Atlas"));

app.use("/users", userRoutes);
app.use("/movies", moviesRoutes);

if (require.main === module) {
     app.listen(process.env.PORT || 4000, () => {
          console.log(`Api is now online at ${process.env.PORT || 4000}`);
     });
}

module.exports = { app, mongoose };
