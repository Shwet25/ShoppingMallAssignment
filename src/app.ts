if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import cors  from "cors";

import express from "express";
import routes from './routes/index';

import Errors from "./helpers/error"




const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Listening at : http://localhost:${PORT}`);
});


// app.get('/test',(req,res)=>{
// try{
// 	let temp=req.query.temp;
	
// 	res.send(temp);
// }catch(err){
// 	Errors.errors(err,req,res);
// }
// })