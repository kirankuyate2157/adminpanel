import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


//routes
import UserRoutes from "./routes/user.routes.js";
import AdminRoutes from "./routes/admin.routes.js"

const app = express();


// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = process.env.CORS_ORIGIN;
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, PATCH");
  next();
});


//routes

app.use(express.json({ limit: "16kb" })); //json upload limit to save server from crash..
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //url data understanding
app.use(express.static("public")); //store file direct on server for public access
app.use(cookieParser()); //cookie  set get operations


app.use("/api/v1/users", UserRoutes)
app.use("/api/v1/admin", AdminRoutes)
app.get("/", (req, res) => {
  res.send("hey i back end api started now testing .... 🍻⏳");
});

export { app };
