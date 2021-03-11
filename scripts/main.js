const app = (() => {

    // Gameboard module
    const gameBoard = (() => {

        // Privates
        let _gameBoard = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

        const _addHighlight = (e) => {
            if (e.target.matches('.c-gameBoard__cell')) {
                e.target.classList.add('highlight');
            }
        };

        const _removeHightlight = (e) => {
            if (e.target.matches('.c-gameBoard__cell')) {
                e.target.classList.remove('highlight');
            }
        };

        // Public
        const getGameBoard = () => _gameBoard;

        const resetGameBoard = () => { _gameBoard = _gameBoard.map(mark => mark = '') }

        const board = document.querySelector('.c-gameBoard__board');
        const turnInfo = document.querySelector('.c-gameBoard__result');

        const isCellEmpty = (index) => _gameBoard[index].length < 1;

        const renderGameBoard = () => {
            board.innerHTML = _gameBoard.map((cell, index) => {
                return (
                    `<div class="c-gameBoard__cell l-grid-center" data-index="${index}">${cell}</div>`
                )
            }).join('');
        };

        const renderMark = (cellIndex) => {
            const mark = document.querySelector(`[data-index="${cellIndex}"`);
            _gameBoard[cellIndex] === 'X' ? mark.classList.add('c-gameBoard__cell--firstPlayer') : mark.classList.add('c-gameBoard__cell--secondPlayer'); 
            mark.textContent = _gameBoard[cellIndex];
        }

        const renderTurn = (playerName) => turnInfo.textContent = `Player's ${playerName} turn`;

        const renderWinner = (playerName) => turnInfo.textContent = `Player ${playerName} won the game!`;

        const renderDraw = () => turnInfo.textContent = `Draw!`;

        // Events
        board.addEventListener('mouseover', _addHighlight);
        board.addEventListener('mouseout', _removeHightlight);

        // Returning
        return { getGameBoard, board, renderGameBoard, isCellEmpty, renderMark, renderTurn, renderWinner, renderDraw, resetGameBoard }

    })();

    // Player factory funciton
    const Players = (name, mark) => {

        // Private
        // If you choosed 'X' mark, first turn is yours
        let _yourTurn = mark === 'X';


        // Public
        const changeTurn = () => _yourTurn = !_yourTurn;

        const getName = () => name;
        const getMark = () => mark;
        const getTurn = () => _yourTurn;

        const setTurn = (value) => { _yourTurn = value }; // Could use setter accessor in return, but for the sake of consistency used "pseudo" setter



        // Returning
        return { getName, getMark, getTurn, setTurn, changeTurn };
    }

    // Game Controller Module
    const gameController = (() => {

        // Privates
        // Player Objects Initalizations
        const playerOne = Players(`One`, 'X');
        const playerTwo = Players(`Two`, 'O');

        const resetButton = document.querySelector('.c-gameBoard__restart');
        const playerOneEl = document.querySelector('.js-firstPlayer');
        const playerTwoEl = document.querySelector('.js-secondPlayer');

        gameBoard.renderGameBoard();
        gameBoard.renderTurn(playerOne.getName());
        playerOneEl.classList.add('d-playerTurn');

        let board = gameBoard.getGameBoard();

        

        const winningPattern = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let gameOver = false;
        let markIndex = [];

        const markCellBoard = (e) => {
            if (gameOver) { return };

            e.preventDefault();
            const cellIndex = e.target.dataset.index;
            if (gameBoard.isCellEmpty(cellIndex)) {
                const board = gameBoard.getGameBoard();
                let playedMark = playerOne.getTurn() ? playerOne.getMark() : playerTwo.getMark();

                if (playerOne.getTurn()) {
                    board[cellIndex] = playedMark;
                    gameBoard.renderMark(cellIndex);
                }

                if (playerTwo.getTurn()) {
                    board[cellIndex] = playedMark;
                    gameBoard.renderMark(cellIndex);
                }

                if (checkGameOver(playedMark)) { return }

                changeTurn();
                gameBoard.renderTurn(_getPlayerName());

            }
        };

        const _getPlayerName = () => {
            return playerOne.getTurn() ? playerOne.getName() : playerTwo.getName()
        }
        const changeTurn = () => {
            playerOne.changeTurn();
            playerTwo.changeTurn();

            if (playerOne.getTurn()) {
                playerTwoEl.classList.remove('d-playerTurn');
                playerOneEl.classList.add('d-playerTurn');
            } else {
                playerTwoEl.classList.add('d-playerTurn');
                playerOneEl.classList.remove('d-playerTurn');
            }
        };

        const trimArray = (array) => {
            return array.filter(item => !item.match(/^\s*$/));  // Return array without spaces
        }

        const getMarksInBoard = (mark) => {
            return trimArray(board).filter(marks => marks === mark).length; // Return array length of played mark
        }

        const checkMarkPattern = (mark) => {

            markIndex = [];
            board.forEach((item, index) => {
                if (!item.match(/^\s*$/) && item === mark) {
                    markIndex.push(index);
                }
            });
            return winningPattern.map((pattern) => {
                return pattern.every(value => markIndex.includes(value));
            }).includes(true);
        }

        const checkGameOver = (mark) => {

            const marksInBoard = getMarksInBoard(mark);

            if (marksInBoard >= 3) {
                const isGameWon = checkMarkPattern(mark);
                if (isGameWon) {
                    gameOver = true;
                    gameBoard.renderWinner(_getPlayerName());
                    return gameOver;
                }
            }

            if (trimArray(board).length >= board.length) {
                gameOver = true;
                gameBoard.renderDraw();
                return gameOver;
            }
        }

        const resetGame = () => {

            gameBoard.resetGameBoard();
            gameBoard.renderGameBoard();
            board = gameBoard.getGameBoard();

            gameOver = false;

            playerOne.setTurn(true);
            playerOneEl.classList.add('d-playerTurn');
            playerTwo.setTurn(false);
            playerTwoEl.classList.remove('d-playerTurn');
            gameBoard.renderTurn(_getPlayerName());

        }

        // Events
        resetButton.addEventListener('click', resetGame);
        gameBoard.board.addEventListener('mousedown', markCellBoard);
    })();
})

app();



