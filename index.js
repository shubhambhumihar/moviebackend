const express = require("express");
const dotenv = require("dotenv");
const databaseConnect = require("./config/dbConnect");
const userRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

databaseConnect();

// app.get("/", (req, res) => {
//   res.send("Hello, Worldjhbhj!");
// });
// app.use(cors());
// Enable CORS for requests from 'http://localhost:5173'
const allowedOrigins = ["https://movie-by-shubham.netlify.app/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
