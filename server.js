function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', ({username, channels}) => {
			socket.emit('welcomeMessage', `Welcome ${username} !!`);
			channels.forEach(channelVal => {
				let data = {
					channel: channelVal
				};
				socket.join(data.channel);
				socket.emit('addedToChannel', data);
			});
		});

		socket.on('joinChannel', (data) => {
			socket.join(data.channel);
			socket.emit('addedToChannel', data);
		});

		socket.on('leaveChannel', (data) => {
			socket.emit('removedFromChannel', data);
			socket.leave(data);
		});

		socket.on('message', ({username, channel, message}) => {
			socket.broadcast.to(channel).emit('newMessage', {username, message});
		});
	});
}

module.exports = bootstrapSocketServer;
