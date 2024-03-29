const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const POKEBOLA = "pokebola"

$("#gameOver").hide();

startGame();

function startGame () {

    initializeCards(game.createCardsFromTechs());

}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click' , flipCard);
        gameBoard.appendChild(cardElement);


    })


}

function createCardContent (card , cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);


}

function createCardFace (face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    } else {
        /* cardElementFace.innerHTML = "&lt/&gt"; */
        let pokebola = document.createElement('img');
        pokebola.classList.add(POKEBOLA);
        pokebola.src = "./images/pokebola1.png";
        cardElementFace.appendChild(pokebola);
    }

    element.appendChild(cardElementFace);

}


function flipCard() {

    if (game.setCard(this.id)) {

    this.classList.add("flip");

    if (game.secondCard) {
    if (game.checkMatch()) {

        game.clearCards();

        if(game.checkGameOver()) {

            $("#gameOver").show(800);
            
        };

    }else {

        setTimeout(()=>{

            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);

            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');

            game.unflipCards();

            }, 700);

        };
        
    };

};

}

$("#restart").click(()=>{
    $("#gameOver").slideUp(800);

    game.clearCards();
    startGame();
 })




$("#buttonPlay").on({
    mouseenter: function() {
        $("#buttonPlay").addClass("flip");
        $("#buttonPlay").click(()=>{
            $("#titulo").hide(500);
            $("#telaInicial").slideUp(1000);

            setTimeout(()=>{
                $("#telaInicial").css("display", "none");
                
                }, 600);
        

        })

    },

    mouseleave: function() {
        $("#buttonPlay").removeClass("flip");
    
        }
    }
)


    
