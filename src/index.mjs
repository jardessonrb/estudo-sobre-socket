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

app.get("/dama", (_, response) => {
    response.sendFile(path.join(urlPath, "dama.html"));
});
app.get("/sala", (_, response) => {
    response.sendFile(path.join(urlPath, "sala.html"));
});

chat(app, io);

app.use('/styles', express.static(path.join(urlPath, "styles")));
app.use('/scripts', express.static(path.join(urlPath, "scripts")));

httpServer.listen(portRunningServer, () => {
    console.log(`Server is running in port ${portRunningServer}`);
});
