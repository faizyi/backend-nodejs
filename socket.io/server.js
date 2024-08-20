import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname , "index.html"))
    // let options ={
    //     root : path.join(__dirname)
    // }
    // let fileName = "index.html"
    // res.sendFile(fileName , options);
});

// let users = 0;

io.on("connection", (socket)=>{
    console.log('a user connected');
    socket.on("chat message", (msg)=>{
        socket.emit("chat message" , msg);
        socket.broadcast.emit('chat message', msg);
    })
    // users++;
    // io.sockets.emit("server", {message : users + "users connected"})
    // socket.emit("server", {message : "hi"});
    // socket.broadcast.emit("server", {message: users + "users connected"})

    // socket.on("client message", (msg)=>{
    //     console.log(msg);
    // })

    // socket.on("client", (data)=>{
    //     console.log(data);
    // })

    // setTimeout(()=>{
    //     socket.emit("server" , "a message from server")
    // },3000)


    socket.on("disconnect", ()=>{
        console.log('a user disconnected');
        // users--;
        // io.sockets.emit("server", {message : users + "users connected"})
        // socket.broadcast.emit("server", {message: users + "users connected"})
    })
})


server.listen(3000, ()=>{
    console.log("server is running on port 3000");
})