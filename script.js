const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; 
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const handleClick = (box) => {
    if (!gameActive || box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;

    checkWinner();
    checkDraw();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            gameActive = false;
            showMessage(`Congratulations! "${boxes[a].innerText}" wins!`);
            disableAllBoxes();
            return;
        }
    }
};

const checkDraw = () => {
    if ([...boxes].every(box => box.innerText !== "") && gameActive) {
        gameActive = false;
        showMessage("It's a Draw!");
    }
};

const showMessage = (message) => {
    msg.innerText = message;
    msgContainer.classList.remove("hide");
};

const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    gameActive = true;
    msgContainer.classList.add("hide");
};

boxes.forEach(box => {
    box.addEventListener("click", () => handleClick(box));
});

resetBtn.addEventListener("click", resetGame);
