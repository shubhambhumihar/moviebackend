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
// const corsOptions = {
//   origin: "http://localhost:5173/", // Replace with your React app's URL
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Pass cookies and HTTP authentication headers with requests
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
