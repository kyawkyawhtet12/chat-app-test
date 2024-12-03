import express from "express";
import { config } from "dotenv";
import { userRoute } from "./routes/userRoute.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { textRoutes } from "./routes/textRoutes.js";

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

httpServer.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    
})

io.on("connection", (socket) => {
    console.log("User Entered!!" ,socket.id);
    socket.emit('message', 'Welcome to the Socket.io server!');
    let message;
    socket.on("message", (data) => {
        message = data.body;
        // console.log(socket.broadcast(data.body))
        console.log(message);

        socket.broadcast.emit('message', message);

        
    })
    let c_message;
    socket.on('c-message', (data) => {
        // console.log(data);

        c_message = data
        
        socket.broadcast.emit(c_message)
    })

    

})