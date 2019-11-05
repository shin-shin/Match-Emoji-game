/*----- constants -----*/
const ARR = ["/imgs/drooling-face_1f924.png", "/imgs/face-savouring-delicious-food_1f60b.png", "/imgs/face-throwing-a-kiss_1f618.png", "/imgs/face-with-stuck-out-tongue-and-tightly-closed-eyes_1f61d.png", "/imgs/face-with-stuck-out-tongue-and-winking-eye_1f61c.png", "/imgs/face-with-tears-of-joy_1f602.png", "/imgs/grinning-face-with-one-large-and-one-small-eye_1f92a.png", "/imgs/grinning-face-with-smiling-eyes_1f601.png", "/imgs/grinning-face-with-star-eyes_1f929.png", "/imgs/kissing-face-with-closed-eyes_1f61a.png", "/imgs/nerd-face_1f913.png", "/imgs/relieved-face_1f60c.png", "/imgs/rolling-on-the-floor-laughing_1f923.png", "/imgs/slightly-smiling-face_1f642.png", "/imgs/smiling-face-with-halo_1f607.png", "/imgs/smiling-face-with-heart-shaped-eyes_1f60d.png", "/imgs/smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606.png", "/imgs/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png", "/imgs/smiling-face-with-sunglasses_1f60e.png", "/imgs/upside-down-face_1f643.png", "/imgs/white-smiling-face_263a.png", "/imgs/winking-face_1f609.png"]

/*----- app's state (variables) -----*/
let mix, board,boardEls, clicked, clicked1, clicked2, matchArr = [], share, reset;
/*----- cached element references -----*/
board = document.querySelector(".board");
share = document.querySelector(".share");
reset = document.querySelector(".reset");

/*----- event listeners -----*/
board.addEventListener("click", handleClick);
share.addEventListener("click", shareClick);
reset.addEventListener("click", resetClick);

/*----- functions -----*/
init();
function build() {
    for (var i = 0; i < 44; i++) {
        board.innerHTML += "<div></div>";
    }
    boardEls = document.querySelectorAll(".board > div");
    // console.log(boardEls);
    return boardEls;
}
function handleClick(e) {
    e.stopPropagation();
    clicked = e.target;
    

    if (clicked.className === "board" || clicked.className === "active" || clicked.nodeName == 'IMG' ) {
        return;
    } else {
    clicked.className = "active";

    console.log(clicked);
    match(clicked);}
    return;
}
function match(clicked) {
    //open first
    if (!clicked1) {
        clicked1 = clicked;
        console.log(`clicked1 ${clicked1.innerHTML}`);
    } else {
        //open second
        clicked2 = clicked;
        console.log(`clicked2 ${clicked2.innerHTML}`);

        //compare
        if (clicked1.innerHTML === clicked2.innerHTML) {
            console.log("true");
            winCheck(boardEls);
        } else {
            console.log("false");
            console.log(clicked1.classList);
            console.log(clicked2.classList);
            // clicked1.classList.remove("active");
            // clicked2.classList.remove("active");
            function clearClass(clicked1,clicked2){
                console.log("timeout")
                console.log(clicked1)
                clicked1.classList.remove("active");
                clicked2.classList.remove("active");
            }
            setTimeout(clearClass, 500,clicked1, clicked2)
            
        }
        clicked1 = clicked2 = "";
    }
}
function winCheck(boardEls){
    console.log("win check");
    // console.log(boardEls);
    let emojis = Array.from(boardEls);
    // if(emojis.every(a=>a.innerHTML.includes("<img"))){
    if(emojis.every(a=>a.classList.contains("active"))){
        console.log("YOU WON!!!!");
    }
    // console.log(boardEls.includes("img"));
    // if (boardEls.every(a => a.includes("<img"))){
    //     console.log("YOU WON!!!!")
    // }
}
function shareClick(e) {
    console.log("share");

}
function resetClick(e) {
    board.innerHTML = "";

    init();
    console.log("reset");

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
function init() {
    build();
    mix = ARR.slice(0);
    mix.forEach(m => mix.push(m));
    shuffleArray(mix);
    for (i = 0; i < boardEls.length; i++) {
        // boardEls[i].style.backgroundImage = `url(${mix[i]})`; 
        boardEls[i].innerHTML = `<img src=${mix[i]}></img>`;
    }

    // console.log(boardEls);
}



//add different sizes (22 pairs takes a lot of time)