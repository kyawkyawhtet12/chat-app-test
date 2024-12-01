import express from "express";
import { config } from "dotenv";
import { userRoute } from "./routes/userRoute.js";
import { createServer } from "http";
import { Server } from "socket.io";


config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', userRoute);

// app.listen(PORT, () => {
//     console.log(`App is running in port ${PORT}`);
// })

io.on("connection", (socket) => {
    console.log("User Enterd!!");

    socket.on("message", (data) => {
        
    })
})