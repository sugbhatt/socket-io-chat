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
			if(data.username !== 'Anonymous') {
				socket.join(data.channel);
				socket.emit('addedToChannel', data);
			}
		});

		socket.on('leaveChannel', (data) => {
			if(data.username !== 'Anonymous') {
				socket.emit('removedFromChannel', data);
				socket.leave(data);
			}
		});

		socket.on('message', (data) => {
			if(data.username !== 'Anonymous') {
				socket.broadcast.to(data.channel).emit('newMessage', data);
			}
		});
	});
}

module.exports = bootstrapSocketServer;
