 const app = (() => {

     const gameBoard = (() => {
         
        // Privates
        const gameBoard = [
             '', '', '',
             '', '', '',
             '', '', ''
         ];

         const board = document.querySelector('.gameBoard');

         const isCellEmpty = (index) => {
            return gameBoard[index].length < 1;
         }

         const _addHighlight = (e) => {
             if (e.target.matches('.gameBoard__cell')) {
                 e.target.classList.add('highlight');
             }
         }

         const _removeHightlight = (e) => {
             if (e.target.matches('.gameBoard__cell')) {
                 e.target.classList.remove('highlight');
             }

         }

         board.addEventListener('mouseover', _addHighlight);
         board.addEventListener('mouseout', _removeHightlight);
        // Public
         const renderGameBoard = () => {
            board.innerHTML = gameBoard.map((cell, index) => {
            return(
                `
                <div class="gameBoard__cell" data-index=${index}>${cell}</div>
                `
            )}).join('');
         }

         // Returning
         return { gameBoard, board, renderGameBoard, isCellEmpty }

     })();

     const Players = (name, mark) => {
        const _name = name;
        const _mark = mark;

        const getName = () => _name;

        function markCellBoard(e) {
            e.preventDefault();
            const cellIndex = e.target.dataset.index;
            if(gameBoard.isCellEmpty(cellIndex))
            {
                gameBoard.gameBoard[cellIndex] = mark;
                gameBoard.renderGameBoard();
            }
            
        }

        gameBoard.board.addEventListener('mousedown', markCellBoard);
        return { getName };
     }

     const gameController = (() => {
         
     })();

     const options = (() => {

     })();

     const playerOne = Players('P1', 'X');
    //  const playerTwo = Players('P2', 'O');

     gameBoard.renderGameBoard();

 })

app();



