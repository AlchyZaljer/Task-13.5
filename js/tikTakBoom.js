tikTakBoom = {
    // инициализация игровых данных
    init(
        tasks,
        players,
        time,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        textFieldAnswer3,
        textFieldAnswer4
    ) {
        this.boomTimer = time;
        this.countOfPlayers = players;
        this.tasks = JSON.parse(tasks);
        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.textFieldAnswer3 = textFieldAnswer3;
        this.textFieldAnswer4 = textFieldAnswer4;
        this.needRightAnswers = 3;
    },

    // начало игры
    run() {
        this.state = 1; // счетчик состояния

        // счетчик правильных ответов каждого игрока
        this.playersResults = {
            'player_1': 0,
            'player_2': 0,
            'player_3': 0,
            'player_4': 0
        };

        // счетчик времени у каждого игрока
        this.playersTimers = {
            'player_1': this.boomTimer,
            'player_2': this.boomTimer,
            'player_3': this.boomTimer,
            'player_4': this.boomTimer
        };

        this.turnOn(); // запуск генерации вопроса

        this.timer(); // запуск таймера для первого игрока
    },

    // генерация вопроса для игрока
    turnOn() {
        // сохранение номера текущего игрока
        this.currentPlayer = this.state;

        // вывод номера игрока в поле статуса
        this.gameStatusField.innerText += ` Вопрос игроку №${this.currentPlayer}`; 

        // запуск распечатывающей функции со случайным вопросом
        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]); 

        // удаление заданного вопроса из общего массива
        this.tasks.splice(taskNumber, 1);

        // "прокрутка" счетчика состояния
        this.state = (this.state == this.countOfPlayers) ? 1 : this.state + 1;
    },

    // обработка ответа на вопрос
    turnOff(value) {
        // снятие действий по кликам
        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
        this.textFieldAnswer3.removeEventListener('click', answer3);
        this.textFieldAnswer4.removeEventListener('click', answer4);

        // вывод "Верно"\"Неверно" в поле состояния
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            //увеличение счетчика правильных ответов у текущего игрока
            this.playersResults[`player_${this.currentPlayer}`] += 1;

            //увеличение времени на 5с у текущего игрока
            this.playersTimers[`player_${this.currentPlayer}`] += 5;

        } else {
            this.gameStatusField.innerText = 'Неверно!';

            //уменьшение времени на 5с у текущего игрока
            this.playersTimers[`player_${this.currentPlayer}`] -= 5;
        }

        // проверка на выход из игры
        if (this.playersResults[`player_${this.currentPlayer}`] < this.needRightAnswers) {
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                this.turnOn();
            }
        } else {
            this.finish('won');
        }
    },

    // распечатка вопроса и ответов
    printQuestion(task) {
        let currentArr = []; // инициализация массива ответов
        currentArr.push(task.answer1, task.answer2, task.answer3, task.answer4);

        let resultArr = []; // инициализация сортировочного массива
        while (currentArr.length > 0) {
            const randomValue = randomIntNumber(currentArr.length - 1);
            const currentAnswer = currentArr[randomValue]; // получение случайного элемента
            resultArr.push(currentAnswer); // добавление полученного элемента в resultArr
            currentArr.splice(randomValue, 1); // удаление полученного элемента из currentArr
        }

        // перезапись ответов в случайном порядке в текущий вопрос
        task.answer1 = resultArr[0];
        task.answer2 = resultArr[1];
        task.answer3 = resultArr[2];
        task.answer4 = resultArr[3];

        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;
        this.textFieldAnswer3.innerText = task.answer3.value;
        this.textFieldAnswer4.innerText = task.answer4.value;

        this.currentTask = task;

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.clicker(1));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.clicker(2));
        this.textFieldAnswer3.addEventListener('click', answer3 = () => this.clicker(3));
        this.textFieldAnswer4.addEventListener('click', answer4 = () => this.clicker(4));
    },

    // генерация окна с итогами игры
    finish(result = 'lose') {
        // вывод сообщения о выигрыше/проигрыше игрока
        if (result === 'lose') {
            this.gameStatusField.innerText = `Игрок №${this.currentPlayer} проиграл! `;
        }
        if (result === 'won') {
            quikEndFlag = 1;
            this.gameStatusField.innerText = `Игрок №${this.currentPlayer} выиграл!`;
        }

        // обнуление данных
        this.state = 0;
        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;
        this.textFieldAnswer3.innerText = ``;
        this.textFieldAnswer4.innerText = ``;
    },

    // действие по клику
    clicker(value) {
        clearTimeout(this.timerId); // остановка текущего таймера

        // сохранение текущего показателя таймера
        let timerSaver = this.timerField.innerText; 

        // получение секунд и минут из сохраненного значения
        let sec = parseInt(timerSaver.substr(3));
        let min = parseInt(timerSaver.substr(0,2));

        // запись числового значения времени у данного игрока
        this.playersTimers[`player_${this.currentPlayer}`] = min * 60 + sec;

        this.turnOff(`answer${value}`); // переход к обработке ответа

        // изменение значения таймера
        this.boomTimer = this.playersTimers[`player_${this.currentPlayer}`];
        
        this.timer(); // запуск таймера для следующего игрока     
    },

    // таймер
    timer() {
        if (this.state) {
            this.boomTimer -= 1;
            let sec = this.boomTimer % 60;
            let min = (this.boomTimer - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.timerField.innerText = `${min}:${sec}`;

            if (this.boomTimer > 0) {
                this.timerId = setTimeout( // сохранение ID таймера для последующей остановки
                    () => {
                        this.timer()
                    },
                    1000,
                )
            } else {
                this.finish('lose');
                quikEndFlag = 1;
            }
        }
    },
}