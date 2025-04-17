let player = {
    name: "Black-Ranger",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    let suits = ["♠", "♥", "♦", "♣"];
    let suit = suits[Math.floor(Math.random() * suits.length)];

    let value;
    let label;

    if (randomNumber === 1) {
        value = 11;
        label = "A";
    } else if (randomNumber > 10) {
        value = 10;
        label = ["J", "Q", "K"][randomNumber - 11];
    } else {
        value = randomNumber;
        label = randomNumber.toString();
    }

    return {
        text: label + suit,
        value: value
    };
}


function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard.value + secondCard.value
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i].text + " "
    }
    
    sumEl.textContent = "Sum: " + sum

    if (sum <= 20) {
        message = "🃏 Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "🎉 You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "💀 You're out of the game!";
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        cards.push(card)
        sum += card.value
        renderGame()        
    }
}
