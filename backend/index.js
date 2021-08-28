import express from 'express';
import { PORT } from './config/variables'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io'
import './config/db'
import orderRouter from './controllers/orderController'

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    transports: ['polling'],
    cors: {
        cors: {
            origin: 'http://localhost:3000'
        }
    }
});

io.on('connection', (socket) => {
    console.log("A user is connected");

    socket.on('message', (message) => {
        console.log(`message from ${socket.id}: ${message}`);
    })

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} is disconnected`);
    })
})

export { io }
app.use(express.json());
app.use(cors());

app.use('/orders', orderRouter)
app.get('/', (req, res) => {
    res.send("Hello")
})

server.listen(PORT, () => {
    console.log(`Realtime server listening on port ${PORT}`)
});