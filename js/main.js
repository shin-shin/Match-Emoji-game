/*----- constants -----*/
const ARR_LARGE = ["/imgs/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png",
"/imgs/smiling-face-with-sunglasses_1f60e.png",
"/imgs/winking-face_1f609.png",
"/imgs/smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606.png",
"/imgs/nerd-face_1f913.png",
"/imgs/grinning-face-with-one-large-and-one-small-eye_1f92a.png",
"/imgs/face-savouring-delicious-food_1f60b.png",
"/imgs/face-throwing-a-kiss_1f618.png",
"/imgs/face-with-cowboy-hat_1f920.png",
"/imgs/face-with-tears-of-joy_1f602.png",
"/imgs/pile-of-poo_1f4a9.png",
"/imgs/smiling-face-with-halo_1f607.png",
"/imgs/robot-face_1f916.png",
"/imgs/overheated-face_1f975.png",
"/imgs/smiling-face-with-horns_1f608.png",
"/imgs/freezing-face_1f976.png",
"/imgs/extraterrestrial-alien_1f47d.png",
"/imgs/drooling-face_1f924.png",
"/imgs/japanese-ogre_1f479.png",
"/imgs/money-mouth-face_1f911.png",
"/imgs/hugging-face_1f917.png",
"/imgs/thinking-face_1f914.png"]

const ARR_MEDIUM = ["/imgs/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png",
"/imgs/smiling-face-with-sunglasses_1f60e.png",
"/imgs/winking-face_1f609.png",
"/imgs/smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606.png",
"/imgs/nerd-face_1f913.png",
"/imgs/grinning-face-with-one-large-and-one-small-eye_1f92a.png",
"/imgs/face-savouring-delicious-food_1f60b.png",
"/imgs/face-throwing-a-kiss_1f618.png",
"/imgs/face-with-cowboy-hat_1f920.png",
"/imgs/face-with-tears-of-joy_1f602.png",
"/imgs/pile-of-poo_1f4a9.png",
"/imgs/smiling-face-with-halo_1f607.png"
]


const ARR_SMALL = ["/imgs/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png",
    "/imgs/smiling-face-with-sunglasses_1f60e.png",
    "/imgs/winking-face_1f609.png",
    "/imgs/smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606.png",
    "/imgs/nerd-face_1f913.png",
    "/imgs/grinning-face-with-one-large-and-one-small-eye_1f92a.png"]

const LARGE = 44;
const MEDIUM = 24;
const SMALL = 12;

/*----- app's state (variables) -----*/
let mix, wrapper, board, boardEls, clicked, clicked1, clicked2, share, reset, size, n, c, boardSize, arr, colorScheme;
n = "small";
c = "green";

/*----- cached element references -----*/
wrapper = document.querySelector(".wrapper");
board = document.querySelector(".board");
colorBtn = document.querySelector(".color");
reset = document.querySelector(".reset");
size = document.querySelector(".size");
mainEl = document.querySelector("main");
bodyEl = document.querySelector("body");

/*----- event listeners -----*/
board.addEventListener("click", handleClick);
colorBtn.addEventListener("click", colorClick);
reset.addEventListener("click", resetClick);
size.addEventListener("click", sizeClick);

/*----- functions -----*/
init(n, c);

function build(n) {
    if (n === "small") {
        boardSize = SMALL;
        arr = ARR_SMALL;
    }
    if (n === "medium") {
        boardSize = MEDIUM;
        arr = ARR_MEDIUM;
    }
    if (n === "large") {
        boardSize = LARGE;
        arr = ARR_LARGE;
    }
    for (var i = 0; i < boardSize; i++) {
        board.innerHTML += "<div></div>";
    }
    boardEls = document.querySelectorAll(".board > div");
    return boardEls;
}
function handleClick(e) {
    e.stopPropagation();
    clicked = e.target;

    if (clicked.className === "board" || clicked.className === "active" || clicked.nodeName == 'IMG') {
        return;
    } else {
        clicked.className = "active";
        match(clicked);
    }
    document.getElementById("click-sound").play();
    return;
}
function clearClass(clicked1, clicked2) {
    clicked1.classList.remove("active");
    clicked2.classList.remove("active");
}
function boardSwitch(clicked2) {
    board.innerHTML = "";
    mainEl.className = "win";
    document.getElementById("tada").play();
}
function match(clicked) {
    //open first
    if (!clicked1) {
        clicked1 = clicked;
    } else {
        //open second
        clicked2 = clicked;

        //compare
        if (clicked1.innerHTML === clicked2.innerHTML) {
            winCheck(boardEls);
        } else {
            function clearClass(clicked1, clicked2) {
                clicked1.classList.remove("active");
                clicked2.classList.remove("active");
            }
            setTimeout(clearClass, 600, clicked1, clicked2);
        }
        clicked1 = clicked2 = "";
    }


}
function winCheck(boardEls) {
    let emojis = Array.from(boardEls);
    if (emojis.every(a => a.classList.contains("active"))) {
        setTimeout(boardSwitch, 600, clicked1, clicked2)
    }
}
function colorClick(e) {
    switch (c) {
        case "green":
            c = "vaporwave"
            break;
        case "vaporwave":
            c = "ghost"
            break;
        case "ghost":
            c = "neon"
            break;
        case "neon":
            c = "oldtown"
            break;
        case "neon":
            c = "oldtown"
            break;
        default:
            //default to green
            c = "green"
    }
    colorSwitch(c);
}
function colorSwitch(c) {
    wrapper.className = `wrapper ${c}`;

}
function resetClick(e) {
    board.innerHTML = "";
    sizeSwitch(n);
}
function sizeClick(e) {
    board.innerHTML = "";
    if (n === "small") {
        n = "medium"
    } else if (n === "medium") {
        n = "large"
    } else {
        n = "small"
    }
    sizeSwitch(n)
    return
}
function sizeSwitch(n) {
    mainEl.className = "";
    bodyEl.className = n;
    init(n, c);
}
/**
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function init(n = "small", c = "green") {
    bodyEl.className = n;
    build(n);
    mix = arr.slice(0);
    mix.forEach(m => mix.push(m));
    shuffleArray(mix);
    for (i = 0; i < boardEls.length; i++) {
        boardEls[i].innerHTML = `<img src=".${mix[i]}"></img>`;
    }

}









