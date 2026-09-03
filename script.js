const menu = document.getElementById("menu");
const deckIntro = document.getElementById("deckIntro");
const game = document.getElementById("game");
const diceGame = document.getElementById("diceGame");
const bingoGame = document.getElementById("bingoGame");

const deckTitle = document.getElementById("deckTitle");
const deckDescription = document.getElementById("deckDescription");

const category = document.getElementById("category");
const action = document.getElementById("action");
const remaining = document.getElementById("remaining");

let currentDeck = [];
let remainingCards = [];
let cards = {};
let slowBurnStage = 0;

const diceBodyParts = [
    "Lips",
    "Stomach",
    "Nipples",
    "Cock/Pussy",
    "Butt",
    "Your Choice"
];

const diceActions = [
    "Kiss",
    "Touch",
    "Caress",
    "Massage",
    "Tease",
    "Your Choice"
];

const slowBurnDecks = [
    "tame",
    "desire",
    "touch"
];

let bingoBoard = [];
let bingoMarked = [];
let bingoSize = 5;

const bingoTasks = {
    sweet: [
        "Give your partner a genuine compliment.",
        "Tell your partner one thing you appreciate about them.",
        "Hold hands for one minute.",
        "Share a favorite memory together.",
        "Give your partner a long hug.",
        "Look into each other's eyes for 30 seconds.",
        "Tell your partner something that always makes you smile.",
        "Give your partner a forehead kiss.",
        "Say three things you love about your partner.",
        "Share something you've always wanted to do together.",
        "Tell your partner what first attracted you to them.",
        "Give each other a five-minute cuddle.",
        "Take turns saying something you admire about each other.",
        "Recreate your favorite photo together.",
        "Dance together for one song.",
        "Tell your partner one thing you're grateful for."
    ],

    flirty: [
        "Give your partner your best flirtatious smile.",
        "Whisper something sweet in your partner's ear.",
        "Give your partner a playful compliment.",
        "Hold eye contact while smiling at each other.",
        "Give your partner a kiss somewhere unexpected.",
        "Tell your partner what outfit you love seeing them wear.",
        "Sit close together for the next round.",
        "Give your partner a playful nickname.",
        "Tell your partner what makes them attractive to you.",
        "Give each other a slow kiss.",
        "Send your partner a flirty text while sitting beside them.",
        "Let your partner choose where they want a kiss.",
        "Tell your partner your favorite thing about their appearance.",
        "Give your partner a playful challenge.",
        "Dance closely together for one song.",
        "Tell your partner what they do that gives you butterflies."
    ],

    steamy: [
        "Give your partner a slow kiss.",
        "Tell your partner what makes you feel most desired.",
        "Give your partner a lingering hug.",
        "Whisper something romantic in their ear.",
        "Let your partner choose a place for a kiss.",
        "Tell your partner a romantic fantasy without acting it out.",
        "Give your partner a slow shoulder massage.",
        "Kiss your partner for ten seconds.",
        "Tell your partner what kind of affection you enjoy most.",
        "Sit facing each other and hold eye contact.",
        "Give your partner three slow kisses.",
        "Tell your partner something that instantly creates chemistry for you.",
        "Let your partner choose the next romantic activity.",
        "Give your partner a playful tease.",
        "Tell your partner your favorite type of kiss.",
        "Spend one minute cuddling without speaking."
    ],

    wild: [
        "Let your partner choose your next kiss.",
        "Tell your partner your boldest romantic idea.",
        "Give your partner a passionate kiss.",
        "Let your partner choose a romantic challenge.",
        "Tell your partner what makes you feel irresistible.",
        "Give your partner a slow and playful massage.",
        "Whisper your favorite romantic thought about them.",
        "Let your partner choose where you kiss them.",
        "Tell your partner something you've been too shy to say.",
        "Give your partner a kiss that lasts at least ten seconds.",
        "Take turns giving each other compliments without repeating one.",
        "Tell your partner what creates the most tension between you.",
        "Let your partner plan the next five minutes.",
        "Give your partner your most seductive smile.",
        "Tell your partner one thing you'd love to experience together.",
        "Choose one romantic rule for the next round."
    ]
};

fetch("cards.json")
    .then(response => response.json())
    .then(data => {
        cards = data;
    })
    .catch(error => {
        console.error("Error loading cards:", error);
    });

function openDeck(deckName) {
    currentDeck = cards[deckName] || [];

    remainingCards = [...currentDeck];

    menu.style.display = "none";
    bingoGame.style.display = "none";
    diceGame.style.display = "none";
    game.style.display = "none";
    deckIntro.style.display = "block";

    if (deckName === "tame") {
        deckTitle.textContent = "🔵 TAME";
        deckDescription.textContent = "The Spark — Conversation Starters";
    } else if (deckName === "desire") {
        deckTitle.textContent = "🔴 DESIRE";
        deckDescription.textContent = "The Heat — Light Foreplay";
    } else if (deckName === "touch") {
        deckTitle.textContent = "🟣 TOUCH ME";
        deckDescription.textContent = "The Connection — Deep Intimacy";
    } else if (deckName === "slowBurn") {
        deckTitle.textContent = "🔥 SLOW BURN";
        deckDescription.textContent = "Build the tension together.";
        slowBurnStage = 0;
        currentDeck = cards.tame || [];
        remainingCards = [...currentDeck];
    } else if (deckName === "random") {
        deckTitle.textContent = "✨ RANDOM WEEKEND";
        deckDescription.textContent = "Anything can happen.";
        currentDeck = Object.values(cards).flat();
        remainingCards = [...currentDeck];
    }
}

function startGame() {
    deckIntro.style.display = "none";
    game.style.display = "block";

    remaining.textContent = remainingCards.length;
    drawCard();
}

function drawCard() {
    if (remainingCards.length === 0) {
        action.textContent = "You've completed this deck!";
        category.textContent = "";
        remaining.textContent = "0";
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const card = remainingCards.splice(randomIndex, 1)[0];

    category.textContent = card.category || "";
    action.textContent = card.action || card.text || card;

    remaining.textContent = remainingCards.length;
}
function openDice() {
    menu.style.display = "none";
    deckIntro.style.display = "none";
    game.style.display = "none";
    bingoGame.style.display = "none";
    diceGame.style.display = "block";

    document.body.className = "dice-theme";
}

function rollDice() {
    const bodyPart =
        diceBodyParts[Math.floor(Math.random() * diceBodyParts.length)];

    const diceAction =
        diceActions[Math.floor(Math.random() * diceActions.length)];

    document.getElementById("diceBody").textContent = bodyPart;
    document.getElementById("diceAction").textContent = diceAction;
}

function closeDice() {
    diceGame.style.display = "none";
    menu.style.display = "block";

    document.body.className = "";
}

function openBingo() {
    menu.style.display = "none";
    deckIntro.style.display = "none";
    game.style.display = "none";
    diceGame.style.display = "none";
    bingoGame.style.display = "block";

    document.body.className = "bingo-theme";

    generateBingoBoard();
}

function closeBingo() {
    bingoGame.style.display = "none";
    menu.style.display = "block";

    document.body.className = "";
}

function getBingoIntensity() {
    const selected = document.querySelector(
        'input[name="bingoIntensity"]:checked'
    );

    return selected ? selected.value : "sweet";
}

function getBingoSize() {
    const select = document.getElementById("bingoSize");

    return parseInt(select.value, 10) || 5;
}

function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function createBingoPool() {
    const intensity = getBingoIntensity();

    let pool = [];

    if (intensity === "sweet") {
        pool = [...bingoTasks.sweet];
    } else if (intensity === "flirty") {
        pool = [
            ...bingoTasks.sweet,
            ...bingoTasks.flirty
        ];
    } else if (intensity === "steamy") {
        pool = [
            ...bingoTasks.flirty,
            ...bingoTasks.steamy
        ];
    } else if (intensity === "wild") {
        pool = [
            ...bingoTasks.flirty,
            ...bingoTasks.steamy,
            ...bingoTasks.wild
        ];
    }

    return shuffleArray(pool);
}

function generateBingoBoard() {
    bingoSize = getBingoSize();

    const totalSquares = bingoSize * bingoSize;

    const pool = createBingoPool();

    bingoBoard = [];

    for (let i = 0; i < totalSquares; i++) {
        bingoBoard.push(
            pool[i % pool.length]
        );
    }

    bingoMarked = new Array(totalSquares).fill(false);

    renderBingoBoard();

    document.getElementById("bingoStatus").textContent =
        "Complete a row, column, or diagonal to win!";
}

function renderBingoBoard() {
    const board = document.getElementById("bingoBoard");

    board.innerHTML = "";

    board.style.gridTemplateColumns =
        `repeat(${bingoSize}, 1fr)`;

    bingoBoard.forEach((task, index) => {
        const cell = document.createElement("button");

        cell.className = "bingo-cell";
        cell.textContent = task;

        if (bingoMarked[index]) {
            cell.classList.add("marked");
        }

        cell.addEventListener("click", () => {
            toggleBingoMark(index);
        });

        board.appendChild(cell);
    });
}

function toggleBingoMark(index) {
    bingoMarked[index] = !bingoMarked[index];

    renderBingoBoard();

    if (bingoMarked[index]) {
        checkBingoWin();
    }
}

function resetBingoMarks() {
    bingoMarked = new Array(bingoBoard.length).fill(false);

    renderBingoBoard();

    document.getElementById("bingoStatus").textContent =
        "Complete a row, column, or diagonal to win!";
}
function checkBingoWin() {
    const size = bingoSize;
    const lines = [];

    for (let row = 0; row < size; row++) {
        const line = [];

        for (let column = 0; column < size; column++) {
            line.push(row * size + column);
        }

        lines.push(line);
    }

    for (let column = 0; column < size; column++) {
        const line = [];

        for (let row = 0; row < size; row++) {
            line.push(row * size + column);
        }

        lines.push(line);
    }

    const diagonalOne = [];

    for (let i = 0; i < size; i++) {
        diagonalOne.push(i * size + i);
    }

    lines.push(diagonalOne);

    const diagonalTwo = [];

    for (let i = 0; i < size; i++) {
        diagonalTwo.push(i * size + (size - 1 - i));
    }

    lines.push(diagonalTwo);

    const winningLine = lines.find(line =>
        line.every(index => bingoMarked[index])
    );

    if (!winningLine) {
        return;
    }

    const cells = document.querySelectorAll(".bingo-cell");

    winningLine.forEach(index => {
        if (cells[index]) {
            cells[index].classList.add("win");
        }
    });

    const name1 =
        document.getElementById("bingoName1").value.trim() ||
        "Partner 1";

    const name2 =
        document.getElementById("bingoName2").value.trim() ||
        "Partner 2";

    document.getElementById("bingoStatus").innerHTML =
        `🎉 BINGO! ${name1} & ${name2} win!`;
}

function goBack() {
    menu.style.display = "block";
    deckIntro.style.display = "none";
    game.style.display = "none";
    diceGame.style.display = "none";
    bingoGame.style.display = "none";

    document.body.className = "";
}
