import dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || "3000";
import web from './routes/web.js'
import connectDB from "./db/connectDB.js";

//databaseurl

const DATABASE_URL = process.env.DATABASE_URL

//database connection
connectDB(DATABASE_URL)


//template engine setup

app.set('views','./views');
app.set('view engine','ejs');

//urlencoded

app.use(express.urlencoded({extended:true}))


//load routes
app.use('/',web)




app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
  