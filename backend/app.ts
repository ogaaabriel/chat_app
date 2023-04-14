import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import socketIo, { Socket } from "socket.io";
import { createServer } from "http";

dotenv.config();

interface Connection {
  username: string;
  roomname: string;
}

interface Message {
  text: string;
}

const app = express();
const httpServer = createServer(app);
const io = new socketIo.Server(httpServer, { cors: { origin: "*" } });
const port = process.env.PORT;
const users = new Map<string, Connection>();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json({ message: "Hello, World!" }));

const joinRoom = "join_room";
const receiveMessages = "receive_messages";
const sendMessage = "send_message";
const disconnect = "disconnect";

const onJoinRoom = (data: Connection, socket: Socket) => {
  const { username, roomname } = data;
  users.set(socket.id, { username, roomname });
  socket.join(roomname);
  socket.to(roomname).emit(receiveMessages, {
    text: username + " entrou no chat",
    type: "notification",
  });
  socket.emit(receiveMessages, {
    text: username + ", bem vindo a sala " + roomname,
    type: "notification",
  });
};

const onSendMessage = (data: Message, socket: Socket) => {
  const connectionData = users.get(socket.id);
  if (!connectionData) {
    return;
  }
  socket
    .to(connectionData.roomname)
    .emit(receiveMessages, { ...data, type: "message" });
};

const onDisconnect = (socket: Socket) => {
  const connectionData = users.get(socket.id);
  if (!connectionData) {
    return;
  }
  socket.to(connectionData.roomname).emit(receiveMessages, {
    text: connectionData.username + " deixou o chat",
    type: "notification",
  });
  users.delete(socket.id);
};

io.on("connection", (socket) => {
  socket.on(joinRoom, (data) => onJoinRoom(data, socket));
  socket.on(sendMessage, (data) => onSendMessage(data, socket));
  socket.on(disconnect, (data) => onDisconnect(socket));
});

httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
