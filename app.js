import express from "express";
import { config } from "dotenv";
import { userRoute } from "./routes/userRoute.js";

config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', userRoute);

app.listen(PORT, () => {
    console.log(`App is running in port ${PORT}`);
})