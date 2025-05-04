import express from "express";
import AppConfig from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";
import contactsRouter from './routes/contacts.route';
import messagesRouter from './routes/messages.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { v4 as uuid } from "uuid";

const app = express();
export const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: AppConfig.origin_url
    }
})

app.use(express.static('/src/public'))
app.use(cors({ origin: AppConfig.origin_url, credentials: true }))
app.use(express.json());
app.use(cookieParser());


app.use('/auth', authRouter);
app.use(contactsRouter);
app.use(messagesRouter);


function getConnectedUsers (io: Server) {
    const connectedUsers = new Map();
    io.sockets.sockets.forEach((socket: Socket) => {
        connectedUsers.set(socket.handshake.auth.username, socket.id)
    });
    return connectedUsers
}

io.on('connection', (socket) => {
    // console.log(`📍: ${socket.id} a user connected`)
    // console.log(socket.handshake.auth.username);
    socket.broadcast.emit('user-connection:online', {
        _id: socket.handshake.auth._id,
        username: socket.handshake.auth.username,
        message: `${socket.handshake.auth.username} is online!`
    });

    socket.on('message:send', (message: { content: string, senderId: string, senderUsername: string, receiverId: string, receiverUsername: string, to: string, from: string}) => {
        const connectedUsers = getConnectedUsers(io)

        const MESSAGE = {
            _id: uuid(),
            content: message.content,
            senderId: message.senderId,
            receiverId: message.receiverId,
            createdAt: new Date().getTime()
        }

        socket.to(connectedUsers.get(message.to)).emit('message:send', MESSAGE)
        if (connectedUsers.get(message.senderUsername)) {
            io.to(connectedUsers.get(message.senderUsername)).emit('message:send', MESSAGE);
        }

    })

    socket.on('message:typing', (data: { typer: string, receiver: string, isTyping: boolean}) => {
        const connectedUsers = getConnectedUsers(io)
        socket.to(connectedUsers.get(data.receiver)).emit('message:typing', { typing: data.isTyping })
    })

    socket.on('message:stop-typing', (data: { typer: string, receiver: string, isTyping: boolean}) => {
        const connectedUsers = getConnectedUsers(io)
        socket.to(connectedUsers.get(data.receiver)).emit('message:stop-typing', { typing: data.isTyping })
    })

    socket.on('disconnect', async () => {
        // console.log(`⚡: ${socket.id} disconnected`)
        io.emit('user-connection:offline', {
            _id: socket.handshake.auth._id,
            username: socket.handshake.auth.username,
            message: `${socket.handshake.auth.username} is offline!`
        })
    })
})


/* Error Handling */
app.use(errorHandler);

export default app;