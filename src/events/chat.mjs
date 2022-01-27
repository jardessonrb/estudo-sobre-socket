export default (app, io) => {
    const connecteds = new Map();
    const giftsInRoom = new Map();
    const rooms = new Set();
    // io.use((socket, next) => {
    //     console.log(socket.request.headers);
    // });

    io.on("connection", (socket) => {
        connecteds.set(socket.id, socket.id);
        console.log(`A user connected with id ${socket.id} - ${connecteds.size} connecteds`);
    
        socket.broadcast.emit("status", "Online");
    
        if(connecteds.size > 1){
            socket.emit("status", "Online");
        }
    
        socket.on('disconnect', function () {
            connecteds.delete(socket.id);
            console.log(`A user with id ${socket.id} - ${connecteds.size} connecteds`);
            socket.broadcast.emit("status", "Offline");
            socket.leave(giftsInRoom.get(socket.id));
            giftsInRoom.delete(socket.id);
        });
    
        socket.on("set_status", (...args) => {
            socket.broadcast.emit("status", args);
        });

        socket.on("message-group", (...args) => {
            io.to(args[0]).emit("response", args[1]);
        })
    
        socket.on("message-unique", (args) => {
            socket.broadcast.emit("response", args);
        });

        socket.on("create-room", (args) => {
            socket.leave(socket.id);
            socket.join(args);
            giftsInRoom.set(socket.id, args);
        });

        
    });
}