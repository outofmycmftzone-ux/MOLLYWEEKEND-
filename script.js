const menu = document.getElementById("menu");
const deckIntro = document.getElementById("deckIntro");
const game = document.getElementById("game");

const deckTitle = document.getElementById("deckTitle");
const deckDescription = document.getElementById("deckDescription");

const category = document.getElementById("category");
const action = document.getElementById("action");
const remaining = document.getElementById("remaining");


let currentDeck = "";
let remainingCards = [];
let cards = {};
let slowBurnStage = 0;


const slowBurnDecks = [
    "tame",
    "desire",
    "touch"
];



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



    if(deck === "tame"){

        deckTitle.innerHTML = "🔵 TAME";
        deckDescription.innerHTML = "The Spark — Conversation Starters";

    }


    if(deck === "desire"){

        deckTitle.innerHTML = "🔴 DESIRE";
        deckDescription.innerHTML = "The Heat — Light Foreplay";

    }


    if(deck === "touch"){

        deckTitle.innerHTML = "🟣 TOUCH ME";
        deckDescription.innerHTML = "The Connection — Deep Intimacy";

    }


    if(deck === "slowburn"){

        deckTitle.innerHTML = "🔥 SLOW BURN";
        deckDescription.innerHTML = "A Journey From Spark To Connection";

    }


    if(deck === "random"){

        deckTitle.innerHTML = "✨ RANDOM WEEKEND";
        deckDescription.innerHTML = "All Cards. Anything Can Happen";

    }

}





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



    let cardElement = document.querySelector(".card");


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





function goBack(){

    menu.style.display = "block";

    deckIntro.style.display = "none";

    game.style.display = "none";


    document.body.className = "";

}
