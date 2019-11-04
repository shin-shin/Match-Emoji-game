/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 
let board, clicked
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
function handleClick(e){
    
    clicked = e.target;

    if(clicked.className === "board") return;
    console.log(clicked);
}
function shareClick(e){

}
function resetClick(e){
    board.innerHTML = "";

    init();

}
function build() {
    for (var i = 0; i < 44; i++) {
        board.innerHTML += "<div></div>";
    }
}
function init(){
    build();
}