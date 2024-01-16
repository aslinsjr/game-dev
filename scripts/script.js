// Views and Values
const state = {
    view: {
        skyBox: document.querySelectorAll(".sky-box"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        resultContainer: document.querySelector(".result-container"),
        mainContent: document.querySelector(".main-content"),
        starterContainer: document.querySelector(".starter-container"),
        startBtn: document.querySelector("#start-btn"),
        resultScreen: document.querySelector("#result"),
        restartBtn: document.querySelector("#restart-btn"),
        // changer: document.querySelector(".selector-container"),
        // changerBtns: document.querySelectorAll(".selector")
    },
    values: {
        timerId: null,
        countDownTimerId: null,
        gameVelocity: 1000,
        hitPosition: 0,  
        result: 0,
        currentTime: 30,
        // changerIndex: 1,
    },
};

// Functions

// function changeDifficult() {
//     state.view.changer.addEventListener("click", () => {
//         state.view.changerBtns.forEach((changeBtn) => {
//             changeBtn.classList.remove("active")
//         })
    
//         state.values.changerIndex++;
           
//          if (state.values.changerIndex > state.view.changerBtns.length) {
//             state.values.changerIndex = 1;
//          }
           
//          state.view.changerBtns[state.values.changerIndex - 1].classList.add("active");

//          if(state.values.changerIndex === 1) {
//             state.values.gameVelocity = 1000;
//         }
        
//         if(state.values.changerIndex === 2) {
//             state.values.gameVelocity = 800;
//         }
        
//         if(state.values.changerIndex === 3) {
//             state.values.gameVelocity = 600;
//         }
//      })
// }

function playSound(audioName, volume) {
    let audio = new Audio(`./audios/${audioName}.mp3`);
    audio.volume = volume;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)

        state.view.mainContent.classList.add("hide")
        state.view.resultContainer.classList.remove("hide")

        state.view.resultScreen.innerHTML = state.values.result
    }
}

function startContDown() {
    state.values.countDownTimerId = setInterval(countDown, 1000)
}

function randomizeSaquare() {
    state.view.skyBox.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.skyBox[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomizeSaquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.skyBox.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;

                playSound("hit", 1);
            }
        })
    })
}

function initialize() {
    startContDown();

    moveEnemy();

    addListenerHitBox();

    playSound("title", 0.5)
}


// Events
state.view.startBtn.addEventListener("click", () => {
    state.view.starterContainer.classList.add("hide");
    state.view.mainContent.classList.remove("hide");

    initialize()
})

state.view.restartBtn.addEventListener("click", () => {
    window.location.reload()
})

// changeDifficult()





