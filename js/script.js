// инициализация флага для быстрого выхода из игры
let quikEndFlag = 0;

//действие по кнопке "Начать игру"
document.querySelector('#startBtn').addEventListener('click', (event) => {
    // получение количества игроков
    let players = document.querySelector('#playersToggle').value;

    // получение значения времени
    let time = document.querySelector('#timeToggleField').value;

    // получение секунд и минут из сохраненного значения
    let sec = parseInt(time.substr(3));
    let min = parseInt(time.substr(0, 2));
    time = min * 60 + sec;

    // скрытие кнопки и переключателей
    document.querySelector('#startBtn').classList.toggle('unseen');
    document.querySelector('#playersToggle').classList.toggle('unseen');
    document.querySelector('.timeToggle').classList.toggle('unseen');

    // стартовый таймер
    let startTimer = (num) => {
        document.querySelector('#startTimer').innerText = num + '..';
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
            game(players, time); // запуск игры
            document.querySelector('#startTimer').innerText = ``;
        }
    };

    startTimer(3); //запуск таймера
})

// действие по кнопке "Конец игры"
document.querySelector('#endBtn').addEventListener('click', (event) => {
    
    // вывод сообщения перед выходом из игры
    if (quikEndFlag == 1) {
        tikTakBoom.finish('won');
        quikEndFlag = 0;
        gameEnd();
    } else {
        tikTakBoom.finish();
        setTimeout(gameEnd, 2000);
    }

    // смена интерфейса игры на стартовое меню
    function gameEnd() {
        document.querySelector('#gameStatusField').innerText = '';
        document.querySelector('.game').classList.toggle('unseen');
        document.querySelector('.settings').classList.toggle('unseen');
        document.querySelector('#startBtn').classList.toggle('unseen');
        document.querySelector('#playersToggle').classList.toggle('unseen');
        document.querySelector('#playersToggle').value= "2";
        document.querySelector('#timeToggleField').value = '00:30';
        document.querySelector('.timeToggle').classList.toggle('unseen');
    };
})

// запуск игры
let game = (players, time) => {
    tikTakBoom.init(
        tasks,
        players,
        time,
        document.querySelector('#timerField'),
        document.querySelector('#gameStatusField'),
        document.querySelector('#questionField'),
        document.querySelector('#answer1'),
        document.querySelector('#answer2'),
        document.querySelector('#answer3'),
        document.querySelector('#answer4'),
    );
    tikTakBoom.run();
}