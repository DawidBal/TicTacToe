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

        // Events
        board.addEventListener('mouseover', _addHighlight);
        board.addEventListener('mouseout', _removeHightlight);


        // Returning
        return { getGameBoard, board, renderGameBoard, isCellEmpty }

    })();


    const Players = (name, mark) => {
        const _name = name;
        const _mark = mark;
        let _gameWon = false;

        // If you choosed 'X' mark, first turn is yours
        let _yourTurn = mark === 'X';

        const _markCellBoard = (e) => {
            e.preventDefault();
            if (_yourTurn && !gameController.isGameOver) {
                const cellIndex = e.target.dataset.index;
                if (gameBoard.isCellEmpty(cellIndex)) {
                    const board = gameBoard.getGameBoard();
                    board[cellIndex] = mark;
                    gameBoard.renderGameBoard();
                    gameController.changeTurn();
                }
            }
        }
        
        const changeTurn = () => {
            _yourTurn = !_yourTurn;
        };

        const getName = () => _name;
        const getMark = () => _mark;

        gameBoard.board.addEventListener('mousedown', _markCellBoard);

        return { getName, getMark, changeTurn };
    }


    const gameController = (() => {

        const changeTurn = () => {
            playerOne.changeTurn();
            playerTwo.changeTurn();
        }

        let isGameOver = false;
        return { isGameOver, changeTurn }
    })();

    const options = (() => {

    })();


    const playerOne = Players('P1', 'X');
    const playerTwo = Players('P2', 'O');

    gameBoard.renderGameBoard();

})

app();



