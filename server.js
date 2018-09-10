function bootstrapSocketServer(io) {
	io.sockets.on('connection', (socket) => {
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

		socket.on('joinChannel', (data) => {
			socket.join(data.channel);
			io.in(data.channel).emit('addedToChannel', data);
		});

		socket.on('leaveChannel', (data) => {
			io.in(data.channel).emit('removedFromChannel', data);
			socket.leave(data);
		});

		socket.on('message', ({username, channel, message}) => {
			socket.broadcast.to(channel).emit('newMessage', {username, message});
		});
	});
}

module.exports = bootstrapSocketServer;
