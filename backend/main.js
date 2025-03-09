const {createServer} = require("http");
const {Server } = require("socket.io");
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const {createClient} = require("redis")
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin: "https://dha-chess.vercel.app",
    methods: ["GET","POST"],
    credentials: true
  }
})

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
  }
})

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

app.use(cors({
	origin: 'https://dha-chess.vercel.app',  
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true 
}));
app.options('/api/register', cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);


io.on("connection", async(socket)=>{
  console.log("connected", socket.id)
  socket.emit("connected", socket.id)

  socket.on("createGame", async(data)=>{
    const status = await redisClient.get("playerAtQueue");
    const waitingStatus = JSON.parse(status);
    if(waitingStatus == null){      
      io.to(data.socketId).emit("waitingToConnect");
      await redisClient.set("playerAtQueue", JSON.stringify(data),{
        EX: 100,
      })
    }else if(waitingStatus.playerName != data.playerName){
      const gameData = {
        player1Name : waitingStatus.playerName,
        player1SocketId : waitingStatus.socketId,
        player1PieceColour : waitingStatus.pieceColor,
        player2Name : data.playerName,
        player2SocketId : data.socketId,
        player2PieceColour : waitingStatus.pieceColor == "white" ? "black" : "white",
      }
      io.to(data.socketId).emit("startGame", gameData)
      io.to(waitingStatus.socketId).emit("startGame", gameData)
      await redisClient.del("playerAtQueue");
    }else{
      console.log("same player")
      io.to(data.socketId).emit("waitingToConnect");
    }
  })

  socket.on("sendMove", (data)=>{
    console.log("opponent made a move")
    io.to(data.socketId).emit("makeMove", data.position)
  })


  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid username or password" });

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/getGameData/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const roomData = await redisClient.get(`room:${roomId}`);
    if(roomData){
      res.status(201).json({data: roomData})
      return
    }
    res.status(201).json({data: "room not available"})    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

async function redisConnect(){
  await redisClient.connect();
}


httpServer.listen(3001, () => {
  console.log("Server running on http://localhost:3000");
  redisConnect()
});

