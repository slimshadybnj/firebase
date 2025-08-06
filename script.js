//Initialize Firebase database reference 
const database = firebase.database().ref();

//Get DOM elements
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const emailElem = document.getElementById('email');
const sendBtn = document.getElementById('send-btn');
const resetBtn = document.getElementById('reset-btn'); // Add this line



//Set send button click handler 
sendBtn.onclick = updateDB;

//Set reset button click handler
resetBtn.onclick = function() {
  // Remove all messages from Firebase
  database.remove();
  // Clear messages from UI
  allMessages.innerHTML = '';
};

//Update Database with new essage 
function updateDB(event) {
  // Prevent default refresh
  event.preventDefault();
  //Get Current date and time 
  const now = new Date ();
  const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
  const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  // Create data object
  const data = {
    USERNAME: usernameElem.value,
    EMAIL: emailElem.value,
    MESSAGE: messageElem.value,
    DATE: formattedDate,
    TIME: formattedTime 
  };
  // console.log the object
  console.log(data);
  // GET *PUSH* PUT DELETE
  database.push(data);
  // Write to our database
  // Reset message
  messageElem.value = '';
}

//Add the addMessageToBoard function as an event
 database.on('child_added', addMessageToBoard);
 
function addMessageToBoard(rowData) {
  // Store the value of rowData inside object named 'data'
  const data = rowData.val();
  // console.log data
  console.log(data);
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  let singleMessage = makeSingleMessageHTML(data.USERNAME, data.EMAIL, data.MESSAGE, data.DATE, data.TIME);
  // Append the new message HTML element to allMessages
  allMessages.append(singleMessage);
}


function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt) {
  // Create Parent Div
  let parentDiv = document.createElement('div');
  // Add Class name .single-message
  parentDiv.className = 'single-message';
  // Create Username P Tag
  let usernameP = document.createElement('p');
  usernameP.className = 'single-message-username';
  usernameP.innerHTML = usernameTxt + ':';
  // Append username
  parentDiv.append(usernameP);
  //Create Email P Tag 
  let emailP = document.createElement('p');
  emailP.innerHTML = emailTxt;
  parentDiv.append(emailP);
  // Create message P Tag
  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;
  parentDiv.append(messageP);
  // Adding the date and time 
  let dateTimeP = document.createElement('p');
  dateTimeP.innerHTML = `${dateTxt} ${timeTxt}`
  parentDiv.append(dateTimeP);
  // Return Parent Div
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */
