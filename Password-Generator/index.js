const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
    "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y",
    "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@",
    "#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",
    ":",";","<",">",".","?", "/"
];

let passwordGenEl = document.querySelector('#password-gen-btn')
let passwordOneEl = document.getElementById('password1')
let passwordTwoEl = document.getElementById('password2')
// For user-defined password length using dropdown
let passwordLength = 15;
let lengthDropdownEl = document.getElementById('lengthDropdown');
let lengthDisplayEl = document.getElementById('length-value');

function getRandomCharacter() { 
    let randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
}

function updateLength() { // Update length from dropdown
    passwordLength = parseInt(lengthDropdownEl.value);
    lengthDisplayEl.textContent = lengthDropdownEl.value;
}

function generateRandomPassword(length = passwordLength) {
    let password = ''
    for (let i = 0; i < length; i++)
        password += getRandomCharacter()
    return password
}

// CHECKPOINT: Copy to clipboard feature
function copyToClipboardAndShowMessage(elementId) {
    const passwordEl = document.getElementById(elementId);
    const passwordText = passwordEl.textContent.trim();
    if (passwordText === "") return;

    // Use the Clipboard API to copy the password text
    navigator.clipboard.writeText(passwordText).then(() => {
        // Show "Copied!" message for a second
        passwordEl.textContent = "Copied!";
        
        // Restore the original password after 1 second
        setTimeout(() => {
            passwordEl.textContent = passwordText;
        }, 1000);
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}

function renderPassword() {
    passwordGenEl.addEventListener('click', () => {
        passwordOneEl.textContent = generateRandomPassword()
        passwordTwoEl.textContent = generateRandomPassword()
    })
}

// Add click listeners to both password boxes
passwordOneEl.addEventListener("click", () => copyToClipboardAndShowMessage("password1"));
passwordTwoEl.addEventListener("click", () => copyToClipboardAndShowMessage("password2"));

renderPassword()
