import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

function getSocketMsg(callback){
  socket.on('msg', message => callback(null, message));
  socket.emit('response', "messaggio ricevuto")
}

export { getSocketMsg }

