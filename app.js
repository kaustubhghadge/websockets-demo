window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');
  var submit=document.getElementById('submit');
  var container=document.getElementById('container');
  
  // Create a new WebSocket.
var socket = new WebSocket('ws://echo.websocket.org');

// Show a connected message when the WebSocket is opened.
socket.onopen = function(event) {
  socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
  socketStatus.className = 'open';
};

// Handle any errors
socket.onerror = function(error) {
  console.log('WebSocket Error: ' + error);
};


// Send a message on form submit
form.onsubmit = function(e) {
  e.preventDefault();

  // get message from textarea
  var message = messageField.value;

  // Send the message through the WebSocket.
  socket.send(message);

  // Add the message to the messages list.
  messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
                            '</li>';

  // Clear out the message field.
  messageField.value = '';

  return false;
};

// Handle messages sent by the server.
socket.onmessage = function(event) {
  var message = event.data;
  messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
                             message + '</li>';
};


// Show a disconnected message and coloring red when the WebSocket is closed.
socket.onclose = function(event) {
  socketStatus.innerHTML = 'Disconnected from WebSocket.';
  socketStatus.className = 'closed';
  submit.className='conclosed';
  container.className='conclosed';
};

// Close the WebSocket connection when the close button is clicked.
closeBtn.onclick = function(e) {
  e.preventDefault();
  socket.close();
  return false;
};
};