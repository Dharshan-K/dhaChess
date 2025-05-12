# ♟️ ChessMate — Checkmate Your Friends in Real-Time

**ChessMate** is a real-time, peer-to-peer multiplayer chess game built for instant, low-latency play — **no login required**. Just register your name, invite a friend, and start playing in seconds.

Designed with performance and simplicity in mind, ChessMate combines **custom-built chess logic**, **Redis**, and **WebSockets** to deliver a smooth, sub-10ms latency experience right in your browser.

---

## 🚀 Features

- 🧑‍🤝‍🧑 **Instant Peer Connection**  
  Players can join by simply entering a name and requesting their friend's name — no login or signup needed.

- ⚡ **Ultra-low Latency**  
  Real-time gameplay with <10ms delay using Redis and Socket.IO for state synchronization.

- 🧠 **Fully Custom Chess Logic**  
  All chess rules and piece movements — including **check**, **checkmate**, **castling**, and **en passant** — are implemented from scratch without external chess libraries.

- 🎨 **Interactive Frontend with chessboard.js**  
  Visual game board using [chessboard.js](https://chessboardjs.com/) for a polished interface.

- 🗂️ **Session Management with Redis**  
  Player matching, game state management, and messaging handled efficiently through Redis.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, [chessboard.js](https://chessboardjs.com/)
- **Backend**: Node.js
- **Real-Time Communication**: Socket.IO
- **Data Store**: Redis

---

## ⚙️ How It Works

1. **Player A** registers with a name and enters Player B’s name to request a match.
2. Redis temporarily stores both players' session info.
3. A WebSocket connection is established via Socket.IO once both players are matched.
4. Players exchange moves in real time with minimal latency.
5. Each move triggers a full validation cycle, including:
   - Piece legality
   - King safety (no illegal check-exposing moves)
   - Checkmate and stalemate detection

---

## 📷 Demo

> [![Demo Video](https://img.youtube.com/vi/4X8UIXhAaZs/0.jpg)](https://www.youtube.com/watch?v=4X8UIXhAaZs)

---

## 💻 Local Setup

```bash
git clone https://github.com/Dharshan-K/dhaChess
cd chessmate/Frontend
npm install
create .env with redis credentials
cd chessmate/Backend
npm run server
```
