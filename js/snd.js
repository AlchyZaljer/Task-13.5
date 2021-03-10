//Вызов звука
const boomSound = new Audio('../sound/Boom.mp3');
const winSound = new Audio('../sound/Win.mp3');
const timerSound = new Audio('../sound/Timer.mp3');
const correctSound = new Audio('../sound/Correct.mp3');
const ErrorSound = new Audio('../sound/Error.mp3');

export const sound = {
    boom: () => boomSound.play(),
    win: () => winSound.play(),
    tick: () => timerSound.play(),
    correct: () => correctSound.play(),
    error: () => ErrorSound.play()
}