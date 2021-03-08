tikTakBoom = {
    // инициализация игровых данных
    init(
        tasks,
        players,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        textFieldAnswer3,
        textFieldAnswer4

    ) {
        this.boomTimer = 30;
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
        console.log(this.boomTimer);
        this.state = 1;

        this.rightAnswers = 0;

        this.turnOn();

        this.timer();
    },

    // генерация вопроса для игрока
    turnOn() {
        // вывод номера игрока в поле статуса
        this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`; 

        // запуск распечатывающей функции со случайным вопросом
        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]); 

        // удаление заданного вопроса из общего массива
        this.tasks.splice(taskNumber, 1);

        
        this.state = (this.state == this.countOfPlayers) ? 1 : this.state + 1;
    },

    // обработка ответа на вопрос
    turnOff(value) {
        // вывод "Верно"\"Неверно" в поле статуса
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.rightAnswers += 1;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
        }
        // проверка на выход из игры
        if (this.rightAnswers < this.needRightAnswers) {
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                this.turnOn();
            }
        } else {
            this.finish('won');
        }

        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
        this.textFieldAnswer3.removeEventListener('click', answer3);
        this.textFieldAnswer4.removeEventListener('click', answer4);
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

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));
        this.textFieldAnswer3.addEventListener('click', answer3 = () => this.turnOff('answer3'));
        this.textFieldAnswer4.addEventListener('click', answer4 = () => this.turnOff('answer4'));

        this.currentTask = task;
    },

    // генерация окна с итогами игры
    finish(result = 'lose') {
        
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
            // this.gameStatusField.innerText = `Игрок №${this.state} проиграл! `;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
            winnerFlag = 1;
            // this.gameStatusField.innerText = `Игрок №${this.state} выиграл!`;
        }

        this.state = 0;
        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;
        this.textFieldAnswer3.innerText = ``;
        this.textFieldAnswer4.innerText = ``;


        // console.log(this);
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
                setTimeout(
                    () => {
                        this.timer()
                    },
                    1000,
                )
            } else {
                this.finish('lose');
            }
        }
    },
}