const menu = document.getElementById("menu");
const deckIntro = document.getElementById("deckIntro");
const game = document.getElementById("game");
const diceGame = document.getElementById("diceGame");

const deckTitle = document.getElementById("deckTitle");
const deckDescription = document.getElementById("deckDescription");

const category = document.getElementById("category");
const action = document.getElementById("action");
const remaining = document.getElementById("remaining");


let currentDeck = "";
let remainingCards = [];
let cards = {};
let slowBurnStage = 0;


/* ========================= */
/* DICE GAME DATA */
/* ========================= */
/*
   REPLACE THESE SIX ITEMS
   WITH YOUR OWN ACTIONS
   AND BODY PARTS LATER.
*/

const diceActions = [

    "ACTION 1",
    "ACTION 2",
    "ACTION 3",
    "ACTION 4",
    "ACTION 5",
    "ACTION 6"

];


const diceBodyParts = [

    "BODY PART 1",
    "BODY PART 2",
    "BODY PART 3",
    "BODY PART 4",
    "BODY PART 5",
    "BODY PART 6"

];



const slowBurnDecks = [

    "tame",
    "desire",
    "touch"

];



/* ========================= */
/* LOAD CARDS */
/* ========================= */

fetch("cards.json")

.then(response => {

    if(!response.ok){

        throw new Error("Cards file failed to load");

    }

    return response.json();

})

.then(data => {

    cards = data;

    console.log("Cards loaded successfully");

})

.catch(error => {

    console.error(error);

    alert("Cards.json failed to load");

});





/* ========================= */
/* OPEN CARD DECK */
/* ========================= */

function openDeck(deck){

    currentDeck = deck;


    document.body.className = "";


    if(deck === "tame" || deck === "slowburn"){

        document.body.classList.add("tame-theme");

    }


    if(deck === "desire"){

        document.body.classList.add("desire-theme");

    }


    if(deck === "touch"){

        document.body.classList.add("touch-theme");

    }



    menu.style.display = "none";

    deckIntro.style.display = "block";

    game.style.display = "none";

    diceGame.style.display = "none";



    if(deck === "tame"){

        deckTitle.innerHTML = "🔵 TAME";

        deckDescription.innerHTML =
        "The Spark — Conversation Starters";

    }


    if(deck === "desire"){

        deckTitle.innerHTML = "🔴 DESIRE";

        deckDescription.innerHTML =
        "The Heat — Light Foreplay";

    }


    if(deck === "touch"){

        deckTitle.innerHTML = "🟣 TOUCH ME";

        deckDescription.innerHTML =
        "The Connection — Deep Intimacy";

    }


    if(deck === "slowburn"){

        deckTitle.innerHTML = "🔥 SLOW BURN";

        deckDescription.innerHTML =
        "A Journey From Spark To Connection";

    }


    if(deck === "random"){

        deckTitle.innerHTML = "✨ RANDOM WEEKEND";

        deckDescription.innerHTML =
        "All Cards. Anything Can Happen";

    }

}





/* ========================= */
/* START CARD GAME */
/* ========================= */

function startGame(){

    deckIntro.style.display = "none";

    game.style.display = "block";



    if(currentDeck === "slowburn"){

        slowBurnStage = 0;

        remainingCards = [

            ...cards[slowBurnDecks[slowBurnStage]]

        ];

    }


    else if(currentDeck === "random"){

        remainingCards = [

            ...cards.tame,
            ...cards.desire,
            ...cards.touch

        ];

    }


    else {

        remainingCards = [

            ...cards[currentDeck]

        ];

    }


    drawCard();

}





/* ========================= */
/* DRAW CARD */
/* ========================= */

function drawCard(){


    if(remainingCards.length === 0){

        alert("No cards left");

        return;

    }



    let random = Math.floor(

        Math.random() * remainingCards.length

    );



    let card = remainingCards[random];


    remainingCards.splice(random,1);



    category.innerHTML = card.category;

    action.innerHTML = card.action;


    remaining.innerHTML =

    "Cards Remaining: " + remainingCards.length;



    let cardElement =
    document.querySelector(".card");


    cardElement.classList.remove(

        "tame-card",
        "desire-card",
        "touch-card",
        "purple-card"

    );



    if(currentDeck === "random"){

        cardElement.classList.add("purple-card");

    }

    else if(currentDeck === "slowburn"){

        cardElement.classList.add(

            slowBurnDecks[slowBurnStage] + "-card"

        );

    }

    else {

        cardElement.classList.add(

            currentDeck + "-card"

        );

    }



    cardElement.style.animation = "none";


    setTimeout(()=>{

        cardElement.style.animation =

        "cardIn .4s ease";

    },10);

}





/* ========================= */
/* OPEN DICE GAME */
/* ========================= */

function openDice(){

    currentDeck = "";

    menu.style.display = "none";

    deckIntro.style.display = "none";

    game.style.display = "none";

    diceGame.style.display = "block";

    document.body.className = "dice-theme";


    document.getElementById("actionDie").innerHTML = "1";

    document.getElementById("bodyDie").innerHTML = "1";

    document.getElementById("diceAction").innerHTML = "Ready?";

    document.getElementById("diceBody").innerHTML = "Ready?";

    document.getElementById("diceResult").innerHTML =
    "Roll the dice!";

}





/* ========================= */
/* ROLL DICE */
/* ========================= */

function rollDice(){

    const actionDie =
    document.getElementById("actionDie");

    const bodyDie =
    document.getElementById("bodyDie");

    const diceResult =
    document.getElementById("diceResult");


    actionDie.classList.add("dice-rolling");

    bodyDie.classList.add("dice-rolling");


    diceResult.classList.remove("show");



    let rollTime = 1000;


    let animation = setInterval(function(){

        actionDie.innerHTML =
        Math.floor(Math.random() * 6) + 1;

        bodyDie.innerHTML =
        Math.floor(Math.random() * 6) + 1;

    },100);



    setTimeout(function(){

        clearInterval(animation);


        actionDie.classList.remove("dice-rolling");

        bodyDie.classList.remove("dice-rolling");



        let actionRoll =
        Math.floor(Math.random() * 6);


        let bodyRoll =
        Math.floor(Math.random() * 6);



        actionDie.innerHTML =
        actionRoll + 1;


        bodyDie.innerHTML =
        bodyRoll + 1;



        let selectedAction =
        diceActions[actionRoll];


        let selectedBody =
        diceBodyParts[bodyRoll];



        document.getElementById("diceAction").innerHTML =
        selectedAction;


        document.getElementById("diceBody").innerHTML =
        selectedBody;



        diceResult.innerHTML =

        selectedAction +
        " + " +
        selectedBody;



        diceResult.classList.add("show");


    },rollTime);

}





/* ========================= */
/* CLOSE DICE */
/* ========================= */

function closeDice(){

    diceGame.style.display = "none";

    menu.style.display = "block";

    deckIntro.style.display = "none";

    game.style.display = "none";

    document.body.className = "";

}





/* ========================= */
/* BACK BUTTON */
/* ========================= */

function goBack(){

    menu.style.display = "block";

    deckIntro.style.display = "none";

    game.style.display = "none";

    diceGame.style.display = "none";

    document.body.className = "";

}
