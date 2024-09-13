const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('noteOn', (data) => {
    socket.broadcast.emit('noteOn', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
