import React, { useState, useEffect } from 'react';


function Square({ value, onSquareClick }) {

  return <button className="square" onClick={onSquareClick}>{value}</button>
}


function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  let status = null

  if (winner) {
    status = `Player ${winner} won!`
  } else {
    status = `Next player: ${xIsNext ? `X` : `O`}`
  }

  function handleClick(i) {
    const nextSquare = [...squares]
    if (nextSquare[i] || calculateWinner(squares)) return
    if (xIsNext) {
      nextSquare[i] = 'X'
    } else {
      nextSquare[i] = 'O'
    }
    onPlay(nextSquare)
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
        <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
        <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
        <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
        <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
        <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
        <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
      </div>
    </>
  )


}


function calculateWinner(squares) {
  const winLists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ]

  for (let i = 0; i < winLists.length; ++i) {
    const [a, b, c] = winLists[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setXisNext] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)
  //The currentSquare is passed as prop to the <Board /> so that the square grid gets the updated move.
  const currentSquares = history[currentMove]

 

  const moves = history.map((button, move) => {
    let description = null
    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = `Go to game start`
    }
    return (
      <li key={move}>
        <button onClick={() => { jumpTo(move) }} className="btn"><i>{description}</i></button>
      </li>
    )
  })


  function jumpTo(nextMove) {
    //Jump to the past move(time travel) using the index(nextMove) of the square clicked by the user.
    setCurrentMove(nextMove)
    //determine whether to show "X" or "O"
    setXisNext(nextMove % 2 === 0)
  }


  function handlePlay(nextSquares) {
    //The "history" is computed from the start of the array to the "currentMove + 1" (we added one because the array "slice" method, "array.slice(start,end)" copies an array "start" to "end "not inclusive ) and the nextSquare array added at the end.
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares]
    setHistory(nextHistory)
    //The lastmove made is the currentMove so far.
    setCurrentMove(nextHistory.length - 1)
    //We flipped the "xIsNext" flag to alternat between "X" and "O".
    setXisNext(!xIsNext)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
      </div>
      <div className="game-info">
        <h3>Your Game History</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}