//действие по кнопке "Начать игру"
document.querySelector('#startBtn').addEventListener('click', (event) => {
    // получение количества игроков
    let players = document.querySelector('#playersToggle').value;

    // скрытие кнопки и переключателя
    document.querySelector('#startBtn').classList.toggle('unseen');
    document.querySelector('#playersToggle').classList.toggle('unseen');

    // стартовый таймер
    let startTimer = (num) => {
        document.querySelector('#startTimer').textContent = num + '..';
        num -= 1;
        if (num >= 0) {
            setTimeout(
                () => {
                    startTimer(num);
                },
                1000,
            )
        } else {
            document.querySelector('.settings').classList.toggle('unseen');
            document.querySelector('.game').classList.toggle('unseen');
            game(players); // запуск игры
            document.querySelector('#startTimer').textContent = '';
        }
    };

    startTimer(3); //запуск таймера
    
})

// действие по кнопке "Конец игры"
document.querySelector('#endBtn').addEventListener('click', (event) => {
    tikTakBoom.finish(); // вывод сообщения о проигрыше

    // таймер на скрытие интерфейса игры
    setTimeout(
    () => { 
    document.querySelector('.game').classList.toggle('unseen');
    document.querySelector('.settings').classList.toggle('unseen');
    document.querySelector('#startBtn').classList.toggle('unseen');
    document.querySelector('#playersToggle').classList.toggle('unseen');
    document.querySelector('#gameStatusField').textContent = '';
    }, 2000);
    
})

// запуск игры
let game = (players) => {
    tikTakBoom.init(
        tasks,
        players,
        document.querySelector('#timerField'),
        document.querySelector('#gameStatusField'),
        document.querySelector('#questionField'),
        document.querySelector('#answer1'),
        document.querySelector('#answer2'),
        document.querySelector('#answer3'),
        document.querySelector('#answer4'),
    )
    tikTakBoom.run();
}