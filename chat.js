
const express = require('express')
const app = express();
app.use(express.static(__dirname + '/public'))
const socketio = require('socket.io')

// socket io listens to express server
const expressServer = app.listen(9000)
const io = socketio(expressServer);

// connection event

io.on('connection', (socket) => {
    socket.emit('messageFromServer', { data: "Welcome to the socketio server" })
    socket.on('messageToServer', (clientData) => {
        console.log(clientData)
    })
    // listens a message from the client and sends the message
    socket.on('messsageToServer', (msg) => {
        console.log(msg)
        io.emit('messageToClients', {message:msg.message,name:msg.name})

    } )
})

