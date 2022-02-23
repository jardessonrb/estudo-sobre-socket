export default (app, io) => {
    io.on("connection", (socket) => {
        console.log("Jogador: ", socket.id);
        socket.on("move-adversario-piece", ({id, coordenate}) => {
            socket.broadcast.emit("move-my-piece", {id, coordenate});
        });
    });
}