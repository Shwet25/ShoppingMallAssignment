if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import cors  from "cors";

import express from "express";
import routes from './routes/index';



const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Listening at : http://localhost:${PORT}`);
});
