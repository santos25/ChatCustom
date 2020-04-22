const socket = io('https://apisocketchat.herokuapp.com');
// const socket = io('http://192.168.1.72:3000');
const chatMessages = document.querySelector('.chat-messages');
const formSubmit = document.getElementById('chat-form');
const roomName = document.getElementById('room-name');
const userNames = document.getElementById('users');

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit('join-chat', { username, room });
// roomName.innerText = room;

socket.on('chat-message', (msg) => {
    appendMessage(msg);
});

socket.on('send-rooms', (data) => {
    outputRooms(data);
});

formSubmit.addEventListener('submit', submitMessage);

function submitMessage(e) {
    e.preventDefault();
    let messageValue = e.target.elements.msg.value;
    console.log(messageValue);

    socket.emit('send-message', { username, room, messageValue });
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
}

function outputRooms(data) {
    roomName.innerText = data.room;
    userNames.innerHTML = data.usersByRoom.map(user => `<li>${user.username}</li>`).join('');
    //  console.log(      data.usersByRoom.map(user => `<li>${user.username}</li>`).join(''));
}

function appendMessage(msg) {
    console.log(msg);
    
    let div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.user} <span> ${msg.time}</span></p>
    <p class="text">
        ${msg.message.messageValue}
    </p>`;
    chatMessages.appendChild(div);

}