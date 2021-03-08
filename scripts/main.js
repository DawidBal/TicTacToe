const app = (() => {

    const gameBoard = (() => {

        // Privates
        const _gameBoard = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

        const _addHighlight = (e) => {
            if (e.target.matches('.gameBoard__cell')) {
                e.target.classList.add('highlight');
            }
        };

        const _removeHightlight = (e) => {
            if (e.target.matches('.gameBoard__cell')) {
                e.target.classList.remove('highlight');
            }
        };

        // Public
        const getGameBoard = () => { return _gameBoard };

        const board = document.querySelector('.gameBoard');

        const isCellEmpty = (index) => {
            return _gameBoard[index].length < 1;
        };

        const renderGameBoard = () => {
            board.innerHTML = _gameBoard.map((cell, index) => {
                return (
                    `
                <div class="gameBoard__cell" data-index=${index}>${cell}</div>
                `
                )
            }).join('');
        };

        const renderMark = (cellIndex) => {
            document.querySelector(`[data-index="${cellIndex}"`).textContent = _gameBoard[cellIndex];
        }

        // Events
        board.addEventListener('mouseover', _addHighlight);
        board.addEventListener('mouseout', _removeHightlight);


        // Returning
        return { getGameBoard, board, renderGameBoard, isCellEmpty, renderMark }

    })();

    const Players = (name, mark) => {
        const _name = name;
        const _mark = mark;
        let _winnner = false;

        // If you choosed 'X' mark, first turn is yours
        let _yourTurn = mark === 'X';

        const _markCellBoard = (e) => {
            e.preventDefault();
            if (_yourTurn && !gameController.isGameOver()) {
                const cellIndex = e.target.dataset.index;
                if (gameBoard.isCellEmpty(cellIndex)) {
                    const board = gameBoard.getGameBoard();
                    board[cellIndex] = mark;
                    gameBoard.renderMark(cellIndex);
                    gameController.checkGameWon(mark);
                    gameController.changeTurn();
                }
            }
        }

        const changeTurn = () => {
            _yourTurn = !_yourTurn;
        };

        const toggleWin = () => {
            _winnner = !_winnner;
        }

        const getName = () => _name;
        const getMark = () => _mark;

        gameBoard.board.addEventListener('mousedown', _markCellBoard);

        return { getName, getMark, changeTurn, toggleWin };
    }

    const gameController = (() => {

        const winningPattern = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        const changeTurn = () => {
            playerOne.changeTurn();
            playerTwo.changeTurn();
        };

        const isGameOver = () => {
            return gameOver;
        }

        const togglePlayerWon = (mark) => {
            playerOne.getMark() === mark ? playerOne.toggleWin() : playerTwo.toggleWin();
        };

        const checkGameWon = (mark) => {
            const board = gameBoard.getGameBoard();
            const marksInBoard = board
            .filter(item => !item.match(/^\s*$/)) // Return array without spaces
            .filter(marks => marks === mark).length; // Return array length of played mark

            if (marksInBoard >= 3)
            {
                const markIndex = [];
                board.forEach((item, index) => {
                    if (!item.match(/^\s*$/) && item === mark) {
                        markIndex.push(index);
                    }
                });

                const isGameWon = winningPattern.map((pattern) => {
                    return pattern.every(value => markIndex.includes(value));
                }).includes(true);

                if (isGameWon) {
                    console.log("GAME ENDED!");
                    gameOver = true;
                    console.log(gameOver);
                    togglePlayerWon(mark);
                }
            }
        }

        let gameOver = false;
        return { isGameOver, changeTurn, checkGameWon, togglePlayerWon }
    })();

    const options = (() => {

    })();


    const playerOne = Players('P1', 'X');
    const playerTwo = Players('P2', 'O');

    gameBoard.renderGameBoard();

})

app();



