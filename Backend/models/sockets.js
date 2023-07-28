const {
  ususarioConectado,
  ususarioDesconectado,
  getUsuarios,
  saveMensajes,
} = require("../controllers/sockets");
const { verificarToken } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, uid] = verificarToken(socket.handshake.query["x-token"]);

      // TODO: Validar el JWT
      // Si el token no es válido, desconectar
      if (!valido) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      // TODO: Saber que usuario está activo mediante el UID

      await ususarioConectado(uid);

      //unir al usuario a una sala de socket.io
      socket.join(uid);

      // TODO: Emitir todos los usuarios conectados
      this.io.emit("lista-usuarios", await getUsuarios());

      // TODO: Socket join, uid

      // TODO: Escuchar cuando el cliente manda un mensaje
      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await saveMensajes(payload);
        this.io.to(payload.para).emit("mensaje-personal", mensaje);
        this.io.to(payload.de).emit("mensaje-personal", mensaje);
      });
      // mensaje-personal

      // TODO: Disconnect
      // Marcar en la BD que el usuario se desconecto
      // TODO: Emitir todos los usuarios conectados

      socket.on("disconnect", async () => {
        await ususarioDesconectado(uid);
        console.log("cliente desconectado");
      });
    });
  }
}

module.exports = Sockets;
