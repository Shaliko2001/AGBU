const socket = io();
socket.on("connect", () => {
    console.log("Socket connected", socket.id);
});

const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageTone = new Audio('/message-tone.mp3');
const profileIcon = document.getElementById('profile-icon');
const profileImg = document.getElementById('profile-img');
const upload = document.querySelector('.upload');
const saveBtn = document.querySelector('.save-button');
const recordButton = document.getElementById('record-button');
let isRecording = false;
let mediaRecorder;
let audioChunks = [];
// Use unique storage per tab
const tabId = Date.now().toString();
sessionStorage.setItem('tabId', tabId);
// Load saved nickname and profile image from local storage
window.addEventListener('load', () => {
    const savedName = sessionStorage.getItem('userName');
    const savedImage = sessionStorage.getItem('userImage');
    if (savedName) {
        nameInput.value = savedName;
    }
    if (savedImage) {
        profileImg.src = savedImage;
        profileImg.style.display = 'block';
        profileIcon.querySelector('i').style.display = 'none'; // Hide the icon
    }
});
// Show file picker on icon click
profileIcon.addEventListener('click', () => {
    upload.click();
});
// Handle file selection
upload.addEventListener('change', () => {
    const file = upload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImg.src = e.target.result;
            profileImg.style.display = 'block';
            profileIcon.querySelector('i').style.display = 'none'; // Hide the icon
            // Save image to session storage
            sessionStorage.setItem('userImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});
// Handle save button click
saveBtn.addEventListener('click', () => {
    const nickName = nameInput.value.trim();
    const file = upload.files[0];
    if (nickName) {
        // Save nickname to session storage
        sessionStorage.setItem('userName', nickName);
    }
    if (file) {
        const formData = new FormData();
        formData.append('user_img', file);
        formData.append('nickName', nickName);
        fetch('/userInfo', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else if (nickName) {
        // Only save nickname if no image is selected
        sessionStorage.setItem('userName', nickName);
    } else {
        alert('Please enter a nickname.');
    }
});
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

socket.on("clients-total", (data) => {
    clientsTotal.innerText = `Total clients: ${data}`
});

function sendMessage() {
    if (messageInput.value === "") return;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit("message", data);
    messageInput.value = ""
};

socket.on("chat-message", (data) => {
    messageTone.play();
    addMessageToUI(false, data)
});

const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageTone = new Audio('/message-tone.mp3');
const profileIcon = document.getElementById('profile-icon');
const profileImg = document.getElementById('profile-img');
const upload = document.querySelector('.upload');
const saveBtn = document.querySelector('.save-button');
const recordButton = document.getElementById('record-button');
let isRecording = false;
let mediaRecorder;
let audioChunks = [];
// Use unique storage per tab
const tabId = Date.now().toString();
sessionStorage.setItem('tabId', tabId);
// Load saved nickname and profile image from local storage
window.addEventListener('load', () => {
    const savedName = sessionStorage.getItem('userName');
    const savedImage = sessionStorage.getItem('userImage');
    if (savedName) {
        nameInput.value = savedName;
    }
    if (savedImage) {
        profileImg.src = savedImage;
        profileImg.style.display = 'block';
        profileIcon.querySelector('i').style.display = 'none'; // Hide the icon
    }
});
// Show file picker on icon click
profileIcon.addEventListener('click', () => {
    upload.click();
});
// Handle file selection
upload.addEventListener('change', () => {
    const file = upload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImg.src = e.target.result;
            profileImg.style.display = 'block';
            profileIcon.querySelector('i').style.display = 'none'; // Hide the icon
            // Save image to session storage
            sessionStorage.setItem('userImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});
// Handle save button click
saveBtn.addEventListener('click', () => {
    const nickName = nameInput.value.trim();
    const file = upload.files[0];
    if (nickName) {
        // Save nickname to session storage
        sessionStorage.setItem('userName', nickName);
    }
    if (file) {
        const formData = new FormData();
        formData.append('user_img', file);
        formData.append('nickName', nickName);
        fetch('/userInfo', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else if (nickName) {
        // Only save nickname if no image is selected
        sessionStorage.setItem('userName', nickName);
    } else {
        alert('Please enter a nickname.');
    }
});
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

messageInput.addEventListener("focus", () => {
    socket.emit("feedback", {
        feedback: ` ${nameInput.value} is typing a message,`
    })
});


