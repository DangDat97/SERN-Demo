import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import iniitWWebRoutes from "./route/web";
import connectDB from './config/connectDB'
require('dotenv').config();
// let dotenv fo

let app = Express();
//cofig app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


viewEngine(app);
iniitWWebRoutes(app);
connectDB();
let port= process.env.PORT || 6969;
//port === undefined => port = 6969
app.listen(port,() =>{
    console.log("Backend Node js is runing on the port:" + port)
});