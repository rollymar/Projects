// Initialize costs, counter, and timestamp
var costIncrementByTwo = 20;
var costIncrementByHundred = 10000;
var costIncrementByThousandPPS = 100000;
var PPSIncrementByThousand = 1000;
var PPSIncrementCostIncrease = 70000;
var counter = 0;
var startTime = Date.now();
var prevCounter = 0;
var prevTime = startTime;

// Function to update points counter and progress bar
function updatePointsCounterAndProgressBar() {
  var pointsCounterElement = document.getElementById('pointsCounter');
  var progressBarElement = document.getElementById('progressBar');

  // Update points counter text
  pointsCounterElement.textContent = counter.toLocaleString() + "/10,000,000";

  // Calculate and update progress bar width
  var progressPercentage = (counter / 10000000) * 100;
  progressBarElement.style.width = progressPercentage + "%";
}

// Function to update PPS counter
function updatePPSCounter() {
  var currentTime = Date.now();
  var elapsedTimeInSeconds = (currentTime - prevTime) / 1000;

  // Check if elapsed time is greater than zero to avoid division by zero
  if (elapsedTimeInSeconds > 0) {
    // Calculate points per second, ensuring counter doesn't decrease below prevCounter
    var pointsPerSecond = Math.max(0, (counter - prevCounter) / elapsedTimeInSeconds);
    var ppsCounterElement = document.getElementById('ppsCounter');
    ppsCounterElement.textContent = pointsPerSecond.toFixed(2) + " PPS";
  } else {
    // If elapsed time is zero, set PPS to zero
    var ppsCounterElement = document.getElementById('ppsCounter');
    ppsCounterElement.textContent = "0.00 PPS";
  }

  prevCounter = counter;
  prevTime = currentTime;
}

// Variable to track whether the "Rookie!!" message has been displayed
var rookieMessageDisplayed = false;

// Function to update counter display
function updateCounterDisplay() {
  var counterElement = document.getElementById('counter');
  counterElement.textContent = counter.toLocaleString();

  // Check if counter reaches 1000 points and the "Rookie!!" message has not been displayed yet
  if (counter >= 1000 && !rookieMessageDisplayed) {
    showMessage("Rookie!!", true); // Show the message and make it persistent
    rookieMessageDisplayed = true; // Set the flag to true to prevent spamming
  }
}


// Function to increment the counter by 1
function increment() {
  counter++;
  updateCounterDisplay();
  updatePointsCounterAndProgressBar();
}

// Function to increment the counter by 2 automatically
function incrementByTwoAutomatically() {
  counter += 2;
  updateCounterDisplay();
  updatePointsCounterAndProgressBar();
}

// Function to increment the counter by 100 automatically
function incrementByHundredAutomatically() {
  counter += 100;
  updateCounterDisplay();
  updatePointsCounterAndProgressBar();
}

// Function to add random messages to the message box
function addRandomMessage() {
  var messages = ["Welcome to Click Mania!", "Keep clicking!", "Upgrade your skills!", "Earn more points!", "I see you :)", "Points go up while you go down :)"];
  var randomIndex = Math.floor(Math.random() * messages.length);
  showMessage(messages[randomIndex]);
}

// Interval to add random messages every 30 seconds
setInterval(addRandomMessage, 30000);

// Function to show message in the message box
function showMessage(message, persistent = false) {
  var messageBox = document.getElementById('messageBox');
  var messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.classList.add('message'); // Add a class for styling
  messageBox.appendChild(messageElement);
  // Scroll to the bottom of the message box
  messageBox.scrollTop = messageBox.scrollHeight;

  // If the message is not persistent, automatically remove it after 5 seconds
  if (!persistent) {
    setTimeout(function() {
      messageBox.removeChild(messageElement);
    }, 10000);
  }
}



// Function to hide the message box
function hideMessage() {
  var messageBox = document.getElementById('messageBox');
  messageBox.innerHTML = ''; // Clear the message box content
}


// Function to buy increment by two
function buyIncrementByTwo() {
  if (counter >= costIncrementByTwo) {
    counter -= costIncrementByTwo;
    costIncrementByTwo += 5; // Increase the cost by 5 points
    var costDisplay = document.getElementById('incrementByTwoCost');
    costDisplay.textContent = costIncrementByTwo;
    incrementByTwoAutomatically();
    setInterval(incrementByTwoAutomatically, 1000); // Auto-increment every second
  } else {
    showMessage("You don't have enough points to unlock increment by two!");
  }
}

// Function to buy increment by hundred
function buyIncrementByHundred() {
  if (counter >= costIncrementByHundred) {
    counter -= costIncrementByHundred;
    costIncrementByHundred += 20000; // Increase the cost by 20,000 points
    var costDisplay = document.getElementById('incrementByHundredCost');
    costDisplay.textContent = costIncrementByHundred.toLocaleString(); // Display the new cost
    incrementByHundredAutomatically();
    prevCounter = counter; // Reset prevCounter when upgrade is purchased
    prevTime = Date.now(); // Reset prevTime when upgrade is purchased
    setInterval(incrementByHundredAutomatically, 1000); // Auto-increment every second
  } else {
    showMessage("You don't have enough points to unlock increment by hundred!");
  }
}

// Function to buy increment by 1000 PPS
function buyIncrementByThousandPPS() {
  if (counter >= costIncrementByThousandPPS) {
    counter -= costIncrementByThousandPPS;
    costIncrementByThousandPPS += PPSIncrementCostIncrease; // Increase the cost
    PPSIncrementByThousand += 1000; // Increase PPS
    var costDisplay = document.getElementById('incrementByThousandPPSCost');
    costDisplay.textContent = costIncrementByThousandPPS.toLocaleString(); // Update cost display
  } else {
    showMessage("You don't have enough points to unlock +1000 PPS!");
  }
}

// Event listener for button click to increment by 1
document.getElementById('incrementButton').addEventListener('click', increment);

// Event listener for button click to buy increment by two
document.getElementById('incrementByTwoButton').addEventListener('click', buyIncrementByTwo);

// Event listener for button click to buy increment by hundred
document.getElementById('incrementByHundredButton').addEventListener('click', buyIncrementByHundred);

// Event listener for button click to buy increment by 1000 PPS
document.getElementById('incrementByThousandPPSButton').addEventListener('click', buyIncrementByThousandPPS);

// Update points counter, progress bar, and PPS counter on page load and every second
window.onload = function() {
  updateCounterDisplay();
  updatePointsCounterAndProgressBar();
  setInterval(updatePPSCounter, 1000);
};

