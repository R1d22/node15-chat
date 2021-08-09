const sio = require('socket.io');
const chatCtrl = require('../../../controllers/chat');


const run = (httpServer) => {
    const io = sio(httpServer);

    io.on('connection', (socket) => {
        console.log(`Connection ID: ${socket.id}` );

        socket.on('login', (data, cb) => {
            const { name } = data;
            const {login} = chatCtrl;
            const uid = login(name, socket.id);
            cb({ id: uid });
        });

        socket.on('message', (data) => {
            const { message } = data;
            const { getUserBySid } = chatCtrl
            user = getUserBySid(socket.id);
            const payload = {
                id: user.id,
                name: user.profile.name,
                message
            };
            socket.broadcast.emit('message', payload)
        });
    });
};

module.exports = run