import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import codeRoute from './routes/codeRoute.js'
import cors from 'cors'

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use('/snippet', codeRoute)

app.use((err, req, res, next) => {
  const status = err.status || '500'
  const message = err.message || 'server error'
  return res.status(status).json({
    message,
    status,
    success: false
  })
})

app.listen(4000, () => {
  console.log(`Server started on port 4000`);
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
});