/*----- constants -----*/
const ARR_LARGE = ["/imgs/drooling-face_1f924.png", "/imgs/face-savouring-delicious-food_1f60b.png", "/imgs/face-throwing-a-kiss_1f618.png", "/imgs/face-with-stuck-out-tongue-and-tightly-closed-eyes_1f61d.png", "/imgs/face-with-stuck-out-tongue-and-winking-eye_1f61c.png", "/imgs/face-with-tears-of-joy_1f602.png", "/imgs/grinning-face-with-one-large-and-one-small-eye_1f92a.png", "/imgs/grinning-face-with-smiling-eyes_1f601.png", "/imgs/grinning-face-with-star-eyes_1f929.png", "/imgs/kissing-face-with-closed-eyes_1f61a.png", "/imgs/nerd-face_1f913.png", "/imgs/relieved-face_1f60c.png", "/imgs/rolling-on-the-floor-laughing_1f923.png", "/imgs/slightly-smiling-face_1f642.png", "/imgs/smiling-face-with-halo_1f607.png", "/imgs/smiling-face-with-heart-shaped-eyes_1f60d.png", "/imgs/smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606.png", "/imgs/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png", "/imgs/smiling-face-with-sunglasses_1f60e.png", "/imgs/upside-down-face_1f643.png", "/imgs/white-smiling-face_263a.png", "/imgs/winking-face_1f609.png"]

const ARR_MEDIUM = ["/imgs/drooling-face_1f924.png", "/imgs/face-savouring-delicious-food_1f60b.png", "/imgs/face-throwing-a-kiss_1f618.png", "/imgs/face-with-stuck-out-tongue-and-tightly-closed-eyes_1f61d.png", "/imgs/face-with-stuck-out-tongue-and-winking-eye_1f61c.png", "/imgs/face-with-tears-of-joy_1f602.png", "/imgs/grinning-face-with-one-large-and-one-small-eye_1f92a.png", "/imgs/grinning-face-with-smiling-eyes_1f601.png", "/imgs/grinning-face-with-star-eyes_1f929.png", "/imgs/kissing-face-with-closed-eyes_1f61a.png", "/imgs/nerd-face_1f913.png", "/imgs/relieved-face_1f60c.png"]

const ARR_SMALL = ["/imgs/drooling-face_1f924.png", "/imgs/face-savouring-delicious-food_1f60b.png", "/imgs/face-throwing-a-kiss_1f618.png", "/imgs/face-with-stuck-out-tongue-and-tightly-closed-eyes_1f61d.png", "/imgs/face-with-stuck-out-tongue-and-winking-eye_1f61c.png", "/imgs/face-with-tears-of-joy_1f602.png"]

const LARGE = 44;
const MEDIUM = 24;
const SMALL = 12;

/*----- app's state (variables) -----*/
let mix, board, boardEls, clicked, clicked1, clicked2, share, reset, size;
/*----- cached element references -----*/
board = document.querySelector(".board");
share = document.querySelector(".share");
reset = document.querySelector(".reset");
size = document.querySelector(".size");
mainEl = document.querySelector("main");
bodyEl = document.querySelector("body");

/*----- event listeners -----*/
board.addEventListener("click", handleClick);
share.addEventListener("click", shareClick);
reset.addEventListener("click", resetClick);
size.addEventListener("click", sizeClick);

/*----- functions -----*/
init();
function build(n) {
    // sizeVal = LARGE;
    if (n === "small"){
        boardSize = SMALL;
        arr = ARR_SMALL;
    }
    if (n === "medium"){
        boardSize = MEDIUM;
        arr = ARR_MEDIUM;
    }
    if (n === "large"){
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
    return;
}
function clearClass(clicked1, clicked2) {
    console.log("time is out, run clearClass()")
    clicked1.classList.remove("active");
    clicked2.classList.remove("active");
}
function boardSwitch(clicked2) {
    board.innerHTML = "";
    mainEl.className = "win";
    // board.style.background = `url("/imgs/winking-face_1f609.png")`;
    // board.style.background = `url(${})`;
    // clicked2.innerHTML.replace("<img src=","").replace(">","")
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
                console.log("time is out, run clearClass()")
                clicked1.classList.remove("active");
                clicked2.classList.remove("active");
            }
            setTimeout(clearClass, 600, clicked1, clicked2)

        }
        clicked1 = clicked2 = "";
    }
}
function winCheck(boardEls) {
    console.log("win check");
    let emojis = Array.from(boardEls);
    if (emojis.every(a => a.classList.contains("active"))) {
        console.log("YOU WON!!!!");
        setTimeout(boardSwitch, 700, clicked1, clicked2)
    }
}
function shareClick(e) {
    console.log("share");

}
function resetClick(e) {
    board.innerHTML = "";
    // mainEl.className ="win";
    init();
    console.log("reset");
}
function sizeClick(e) {
    board.innerHTML = "";
    console.log(bodyEl.classList);
    if (bodyEl.classList.contains("small")){
        bodyEl.className = "medium";
        init("medium");
    } else if (bodyEl.classList.contains("medium")){
        bodyEl.className = "large";
        init("large");
    } else {
        bodyEl.className = "small";
        init("small");
    }

    console.log("size clicked");
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
function init(n = "large") {
    // bodyEl.className = n;
    build(n);
    // console.log(`n is ${n}`)
    // console.log(`arr length is ${arr.length}`)
    mix = arr.slice(0);
    mix.forEach(m => mix.push(m));
    shuffleArray(mix);
    for (i = 0; i < boardEls.length; i++) {
        boardEls[i].innerHTML = `<img src=${mix[i]}></img>`;
    }
}



//add different sizes (22 pairs takes a lot of time)