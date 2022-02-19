import React from 'react';
import Board from './components/Board.js';

const App = () => {
    return (
        <div className='container'>
            <h1>Tic-Tac-Toe Game</h1>

            <Board />
        </div>
    );
};

export default App;
