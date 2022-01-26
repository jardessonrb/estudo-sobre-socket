import url from 'url';
import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const urlPath = url.fileURLToPath(new URL(".", import.meta.url));
const portRunningServer = 3333;

app.get("/", (_, response) => {
    response.sendFile(path.join(urlPath, "index.html"));
});

app.use(express.static(urlPath + '/styles'));
const connecteds = new Map();
io.on("connection", (socket) => {
    console.log('A user connected with id: ', socket.id);
    connecteds.set(socket.id, socket.id);

    socket.broadcast.emit("status", "Online");

    if(connecteds.size > 1){
        socket.emit("status", "Online");
    }

    socket.on('disconnect', function () {
      console.log(`A user with id: ${socket.id} disconnected`);
      connecteds.delete(socket.id);
      socket.broadcast.emit("status", "Offline");
    });

    socket.on("set_status", (...args) => {
        socket.broadcast.emit("status", args);
    })

    socket.on("message", (...args) => {
        socket.broadcast.emit("response", args);
    });
});

httpServer.listen(portRunningServer, () => {
    console.log(`Server is running in port ${portRunningServer}`);
});
