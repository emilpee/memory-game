// import {allCards} from './modules/cards.js';


const allCards = [{
        name: 'kent',
        img: 'images/kent.jpg',

    },
    {
        name: 'verkligen',
        img: 'images/verkligen.jpg',
    },
    {
        name: 'isola',
        img: 'images/isola.jpg',
    },
    {
        name: 'hagnesta-hill',
        img: 'images/hagnesta-hill.jpg',
    },
    {
        name: 'vapen-o-ammunition',
        img: 'images/vapen-o-ammunition.jpg',
    },
    {
        name: 'du-och-jag-doden',
        img: 'images/du-och-jag-doden.jpg',
    },
    {
        name: 'tillbaka-till-samtiden',
        img: 'images/tillbaka-till-samtiden.jpg',
    },
    {
        name: 'rod',
        img: 'images/rod.jpg',
    },
    {
        name: 'en-plats-i-solen',
        img: 'images/en-plats-i-solen.jpg',
    },
    {
        name: 'jag-ar-inte',
        img: 'images/jag-ar-inte.jpg',
    },
    {
        name: 'tigerdrottningen',
        img: 'images/tigerdrottningen.jpg',
    },
    {
        name: 'da-som-nu',
        img: 'images/da-som-nu.jpg',
        bg: 'images/ros.jpg',

    },
];

// Spara spelplan i variabel och placera ut kortbehållare
const board = document.getElementById('board');
const cardContainer = document.createElement('div');
cardContainer.setAttribute('class', 'cardContainer');
board.appendChild(cardContainer);

// Skapa kopior av varje kort
var allCardsCopy = allCards;
const doubleImg = allCards.concat(allCardsCopy);

// Blanda korten innan de skrivs ut
shuffle(doubleImg);

// Skriv ut kortens framsidor med respektive bild och tilldela dem klass
doubleImg.forEach(item => {
    var card = document.createElement('img');
    card.classList.add('bg');
    card.classList.add('card');
    card.dataset.value = item.name;
    card.src = item.img;
    cardContainer.appendChild(card);
})


// Funktion som blandar alla kort
function shuffle(array) {
    for (let i = 0; i < doubleImg.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Gör två kort klickbara 
var flippedCards = 0;
var guessOne = '';
var guessTwo = '';
var points = 0;

function gameReset() {
    flippedCards = 0;
    guessOne, guessTwo = '';
}

// Poäng och meddelande
var message = document.getElementById("message");
var displayPoints = document.getElementById("points");
displayPoints.innerHTML = points;

cardContainer.addEventListener('click', function(event) {
    let clickedCard = event.target;
    clickedCard.classList.remove('bg'); // flip
    if (clickedCard.dataset.value == undefined) {
        return;
    }
    if (flippedCards < 2) {
        flippedCards++;
        clickedCard.classList.toggle('selectedCard');
    }
    if (flippedCards == 1) {
        guessOne = clickedCard.dataset.value;
        clickedCard.classList.add('noTarget'); // Gör att bilden ej är klickbar igen
    }
    if (flippedCards == 2) {
        var selections = document.querySelectorAll('.selectedCard');
        guessTwo = clickedCard.dataset.value;
        if (guessOne === guessTwo) {
            points++;
            displayPoints.innerHTML = points;
            selections.forEach(card => {
                card.classList.add('wonCards');
            });
            gameReset();
            message.innerHTML = "Och jag vet, jag har rätt, du har fel";
            setTimeout(function() {
                message.innerHTML = '';
            }, 2000);
        } else {
            selections.forEach(card => {
                message.innerHTML = "Gör fel, gör om, gör rätt";
                cardContainer.classList.add('noTarget'); // Stäng av klickbarhet
                setTimeout(function() {
                    card.classList.add('bg');
                    card.classList.remove('selectedCard');
                    gameReset();
                    card.classList.remove('noTarget'), cardContainer.classList.remove('noTarget'); // Gör bilder klickbara igen
                    message.innerHTML = '';
                }, 2000);
            })
        }
    }
})


//Timer
var timeLeft = 6000;
var timeTick = setInterval(function() {
    document.getElementById('gametimer').innerHTML = "Tiden går: 0:" + (timeLeft < 11 ? "0" : "") + --timeLeft;

    if (timeLeft <= 0) {
        document.getElementById('gametimer').innerHTML = '<div id=\"finishedGame\">Tyvärr, tiden tog slut :(</div>' +
            '<br><img src=\"images/lose.gif\">' +
            '<br><div id=\"finishedGamemenu\">&larr; Spela igen?</div>';;
        document.getElementById("board").style.opacity = "0.4";
        document.getElementById("board").style.pointerEvents = "none";


        clearInterval(timeTick);
    }

    if (points == 12) {
        document.getElementById('gametimer').innerHTML = '<div id=\"finishedGame\">Får jag gratulera, du vann <b>kent memory</b> med stil!</div>' +
            '<br> <img src=\"images/win.gif\">' +
            '<br><div id=\"finishedGamemenu\">&larr; Tillbaka</div>';
        document.getElementById("board").style.opacity = "0.4";
        document.getElementById("board").style.pointerEvents = "none";
        document.getElementById("message").style.display = "none";

    }

    document.getElementById('finishedGamemenu').onclick = function() {
        location.reload();
    }

}, 1000);