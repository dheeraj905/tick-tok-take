let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add event listener to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        console.log(`Box ${index} was clicked`);

        // Set text based on current turn
        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");
        } else {
            box.innerText = "X";
            box.classList.add("X");
        }

        // Check for a winner after every turn
        checkWinner();

        // Disable further clicks on the box
        box.style.pointerEvents = "none";

        // Toggle the turn
        turnO = !turnO;
    });
});

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("Winner:", pos1val);
            showWinner(pos1val);

            // Disable further clicks on all boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            return;
        }
    }

    // Check for draw
    const isDraw = Array.from(boxes).every((box) => box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

// Reset button functionality
resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
        box.classList.remove("O", "X");
    });
    turnO = true;
    msgContainer.classList.add("hide");
    console.log("Game reset!");
});

// Optional: New Game button functionality
newGameBtn.addEventListener("click", () => {
    resetBtn.click();
    console.log("Starting a new game!");
});
