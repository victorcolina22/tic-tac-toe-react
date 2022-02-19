import React, { useState } from 'react';


const Board = () => {
    // 1. Se comienza creando un estado inicial para la tabla que en este caso será un array con 9 posiciones y estarán vacías.
    const [square, setSquare] = useState(Array(9).fill(null));

    // 2. Se crea un estado inicial para el turno del jugador(es indiferente si es true o false, la idea es utilizarlo como un botón switch, true: jugador1
    // false: jugador2).
    let [turn, setTurn] = useState(true);

    // 4. Se crea una función de tipo "click" para obtener el índice de cada cuadro del tablero. Luego creamos una variable que obtendrá el valor de "X" u "O"
    // según el estado del turno del jugador. Se crea una nueva variable "value" y se le asigna una copia del array inicial "square" para poder modificarla y agregarle
    // el valor de "letter" en la posición correspondiente según el índice obtenido. Finalmente modificamos el array mediante "setSquare".
    const handleClick = (index) => {
        let letter = turn ? 'X' : 'O';
        const value = [...square];

        // Condicional para evitar cambiar el valor en una celda ya clickeada ó que el juego ya no continúe si un jugador ganó.
        if (calculateWinner(square) || value[index] !== null) return

        value[index] = letter;
        setTurn(turn = !turn);
        calculateWinner(square);

        return setSquare(value);
    }

    const reset = () => {
        return setSquare(Array(9).fill(null));
    }

    // 5. Se crea una función para chequear el ganador. Se inicia un array con las posibles combinaciones para ganar y luego se hace un ciclo for para recorrerlo
    // y se pregunta, si cada posición (a,b,c) están en el tablero se determina el ganador. "a" sería todos los primeros elementos de los array, "b" los segundos
    // y "c" los terceros.
    const calculateWinner = (squares) => {
        const winningLine = [
            //   a  b  c
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winningLine.length; i++) {
            const [a, b, c] = winningLine[i];

            if (squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    // 6. Finalmente se crea una variable para almacenar el texto que definirá quien es el ganador, la función "calculateWinner" devolverá el jugador que haya ganado
    // (squares[a]). Y se pasa al HTML.
    let player;
    const winner = calculateWinner(square);

    player = winner ? `Winner is: ${winner}` : `Next player: ${turn ? 'X' : 'O'}`;

    return (
        <>
            <h2>{player}</h2>
            <button className='reset' onClick={reset}>Reset</button>
            <div className='board'>
                {
                    // 3. Se hace un map al array inicial "square" para desplegar las 9 posiciones del tablero en el HTML.
                    square.map((value, index) => {
                        return (
                            <button className='square' onClick={() => handleClick(index)} key={index}>{value}</button>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Board;
