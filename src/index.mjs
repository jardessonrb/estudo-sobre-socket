import url from 'url';
import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import chat from './events/chat.mjs';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const urlPath = url.fileURLToPath(new URL(".", import.meta.url));
const portRunningServer = 3333;

app.get("/", (_, response) => {
    response.sendFile(path.join(urlPath, "index.html"));
});
chat(app, io);

app.get("/sala", (_, response) => {
    response.sendFile(path.join(urlPath, "sala.html"));
});

httpServer.listen(portRunningServer, () => {
    console.log(`Server is running in port ${portRunningServer}`);
});
