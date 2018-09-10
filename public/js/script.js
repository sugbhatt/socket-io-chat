function sendMessage(event, socket) {
	event.preventDefault();
	const username = document.getElementById('username').value;
	const channel = document.getElementById('channel').value;
	const message = document.getElementById('message').value;
	const textElement = document.createElement('p');
	textElement.className = 'card-text';
	textElement.innerHTML = 'Me : ' + message;
	const bodyElement = document.createElement('div');
	bodyElement.className = 'card-body';
	bodyElement.appendChild(textElement);
	const messageElement = document.createElement('div');
	messageElement.className = 'card sent-message';
	messageElement.appendChild(bodyElement);
	const divElement = document.createElement('div');
	divElement.className = 'col-12';
	divElement.appendChild(messageElement);
	const chatContainer = document.getElementById('chatContainer');
	chatContainer.insertBefore(divElement, chatContainer.firstChild);
	socket.emit('message', { username, channel, message });
}

function joinChannel(event, socket) {
	event.preventDefault();
	const channelVal = document.getElementById('newchannel').value;
	let data = {
		channel: channelVal
	};
	socket.emit('joinChannel', data);
}

function leaveChannel(event, socket) {
	event.preventDefault();
	const channelVal = document.getElementById('newchannel').value;
	let data = {
		channel: channelVal
	};
	socket.emit('leaveChannel', data);
}

function onWelcomeMessageReceived(message) {
	const textElement = document.createElement('p');
	textElement.className = 'card-text';
	textElement.innerHTML = 'System : ' + message;
	const bodyElement = document.createElement('div');
	bodyElement.className = 'card-body';
	bodyElement.appendChild(textElement);
	const messageElement = document.createElement('div');
	messageElement.className = 'card received-message';
	messageElement.appendChild(bodyElement);
	const divElement = document.createElement('div');
	divElement.className = 'col-12';
	divElement.appendChild(messageElement);
	document.getElementById('chatContainer').appendChild(divElement);
}

function onNewMessageReceived({username, message}) {
	const textElement = document.createElement('p');
	textElement.className = 'card-text';
	textElement.innerHTML = username + ' : ' + message;
	const bodyElement = document.createElement('div');
	bodyElement.className = 'card-body';
	bodyElement.appendChild(textElement);
	const messageElement = document.createElement('div');
	messageElement.className = 'card received-message';
	messageElement.appendChild(bodyElement);
	const divElement = document.createElement('div');
	divElement.className = 'col-12';
	divElement.appendChild(messageElement);
	const chatContainer = document.getElementById('chatContainer');
	chatContainer.insertBefore(divElement, chatContainer.firstChild);
}

function onAddedToNewChannelReceived(data) {
	const spanElement = document.createElement('span');
	spanElement.setAttribute('aria-hidden', 'true');
	spanElement.innerHTML = '&times;';
	const buttonElement = document.createElement('button');
	buttonElement.setAttribute('type', 'button');
	buttonElement.setAttribute('data-dismiss', 'alert');
	buttonElement.setAttribute('aria-label', 'Close');
	buttonElement.className = 'close';
	buttonElement.appendChild(spanElement);
	const divElement = document.createElement('div');
	divElement.className = 'alert alert-success alert-dismissible fade show';
	divElement.setAttribute('role', 'alert');
	divElement.innerHTML = `You are added to <strong>${data.channel}</strong> successfully!`;
	divElement.appendChild(buttonElement);
	document.getElementById('alertContainer').appendChild(divElement);
	const optionElement = document.createElement('option');
	optionElement.value = data.channel;
	document.getElementById('channelsList').appendChild(optionElement);
}

function onRemovedFromChannelReceived(data) {
	const spanElement = document.createElement('span');
	spanElement.setAttribute('aria-hidden', 'true');
	spanElement.innerHTML = '&times;';
	const buttonElement = document.createElement('button');
	buttonElement.setAttribute('type', 'button');
	buttonElement.setAttribute('data-dismiss', 'alert');
	buttonElement.setAttribute('aria-label', 'Close');
	buttonElement.className = 'close';
	buttonElement.appendChild(spanElement);
	const divElement = document.createElement('div');
	divElement.className = 'alert alert-success alert-dismissible fade show';
	divElement.setAttribute('role', 'alert');
	divElement.innerHTML = `You are removed from <strong>${data.channel}</strong> successfully!`;
	divElement.appendChild(buttonElement);
	document.getElementById('alertContainer').appendChild(divElement);
	const channelsList = document.getElementById('channelsList');
	let options = channelsList.getElementsByTagName('option');
	Array.from(options).find(option => option.value === data.channel).remove();
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

