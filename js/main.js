/*----- constants -----*/ 
/*----- app's state (variables) -----*/ 
/*----- cached element references -----*/ 
board = document.querySelector(".board");
/*----- event listeners -----*/ 
/*----- functions -----*/
init();
function build() {
    for (var i = 0; i < 44; i++) {
        board.innerHTML += "<div></div>";
    }
}
function init(){
    build();
}