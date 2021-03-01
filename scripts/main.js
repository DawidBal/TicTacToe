 const app = (() => {

     const gameBoard = (() => {
         
        // Privates
        const _gameBoard = [
             '', '', '',
             '', '', '',
             '', '', ''
         ];

         const _board = document.querySelector('.gameBoard');

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

         _board.addEventListener('mouseover', _addHighlight);
         _board.addEventListener('mouseout', _removeHightlight);
        // Public
         const renderGameBoard = () => {
            _board.innerHTML = _gameBoard.map(cell => {
            return(
                `
                <div class="gameBoard__cell">${cell}</div>
                `
            )}).join('');
         }

         // Returning
         return { renderGameBoard }

     })();

     const Players = (name, mark) => {
        const _name = name;
        const _mark = mark;

        const getName = () => _name;
        return { getName };
     }

     const gameController = (() => {

     })();

     const options = (() => {

     })();

     const playerOne = Players('P1', 'X');
     const playerTwo = Players('P2', 'O');

     gameBoard.renderGameBoard();

 })

app();



