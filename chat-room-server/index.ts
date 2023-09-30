import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";

const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to chat-room server");
});

const server = app.listen(PORT, () => {
  console.log(`chat-room server started at ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on('send-message',({message,username},room)=>{
    socket.to(room).emit('recieve-message',{message,username})
  })
  socket.on('join-room',(room)=>{
    socket.join(room)
  })
});
