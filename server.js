function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', ({username, channels}) => {
			socket.emit('welcomeMessage', `Welcome ${username} !!`);
			channels.forEach(channelVal => {
				let data = {
					channel: channelVal
				};
				socket.join(data.channel);
				io.in(data.channel).emit('addedToChannel', data);
			});
		});
	});
	io.on('connection', (socket) => {
		socket.on('joinChannel', (data) => {
			socket.join(data.channel);
			io.in(data.channel).emit('addedToChannel', data);
		});
	});
	io.on('connection', (socket) => {
		socket.on('leaveChannel', (data) => {
			io.in(data.channel).emit('removedFromChannel', data);
			socket.leave(data);
		});
	});
	io.on('connection', (socket) => {
		socket.on('message', ({username, channel, message}) => {
			socket.broadcast.to(channel).emit('newMessage', {username, message});
		});
	});
}

module.exports = bootstrapSocketServer;
