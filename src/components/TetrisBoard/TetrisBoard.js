import React from 'react';
import './TetrisBoard.scss';
import createTetromino from '../Tetrominoes/Tetrominos';

export default class TetrisBoard extends React.Component {
    state = {
        board: Array(20).fill(0).map(row => new Array(10).fill(0)),
        isGameOver: false,
        fallingTetromino: null,
        tetrominoPosition: [0, 4],
    }

    createRandomTetromino = () => {
        const tetrominos = [
            't',
            'o',
            'l',
            'j',
            'i',
            's',
            'z',
        ];
        return createTetromino(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
    }

    checkCollision = (board, tetromino, boardY, boardX) => {
        const blockPositions = this.getBlockPositions(tetromino.grid, boardY, boardX);

        for (let i = 0; i < blockPositions.length; i++) {
            const currentPosition = blockPositions[i]

            if (currentPosition[1] < 0) {
                return true;
            }
            if (currentPosition[1] > 9) {
                return true;
            }
            if (currentPosition[0] < 0) {
                return true;
            }
            if (currentPosition[0] > 19) {
                return true;
            }
            if (board[currentPosition[0]][currentPosition[1]] !== 0) {
                return true;
            }
        }
        return false;
    }

    mergeTetromino = (board, tetromino, boardY, boardX) => {
        const blockPositions = this.getBlockPositions(tetromino.grid, boardY, boardX);

        for (let i = 0; i < blockPositions.length; i++) {
            const currentPosition = blockPositions[i]

            board[currentPosition[0]][currentPosition[1]] = tetromino.type
        }
    }

    dropNewTetromino = () => {


    }

    getBlockPositions = (tetrominoGrid, boardY, boardX) => {
        const blockPositions = [];

        for (let y = 0; y < tetrominoGrid.length; y++) {
            for (let x = 0; x < tetrominoGrid[y].length; x++) {
                if (tetrominoGrid[y][x] !== 0) {
                    blockPositions.push([y + boardY, x + boardX])
                }
            }
        }
        return blockPositions;
    }

    moveTetromino = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY + 1, boardX);

        if (isColliding) {
            const newBoard = this.state.board.map((arr) => { return arr.slice(); });
            this.mergeTetromino(newBoard, tetromino, boardY, boardX);
            const newTetromino = this.createRandomTetromino();

            this.setState({ 
                board: newBoard,
                fallingTetromino: newTetromino,
                tetrominoPosition: [0, 4]
            })
            return;
        }

        this.setState({ tetrominoPosition: [boardY + 1, boardX] })

        console.log({ tetrominoPosition: [boardY + 1, boardX] })
    }


    componentDidMount = () => {
        const newTetromino = this.createRandomTetromino()
        const newBoard = this.state.board.map((arr) => { return arr.slice(); });

        // this.mergeTetromino(newBoard, newTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1])
        this.setState({ fallingTetromino: newTetromino, board: newBoard })
        setInterval(() => {
            this.moveTetromino(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
        }, 1000)
    }

    componentDidUpdate = () => {
        // this.newBoard(this.state.count);
        // setTimeout(() => {
        //     this.moveBoard();
        // }, 1000)
    }

    render = () => {
        const boardWithTetromino = this.state.board.map((arr) => { return arr.slice(); });
        if (this.state.fallingTetromino) {
            this.mergeTetromino(boardWithTetromino, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
        }

        return (
            <>
                {boardWithTetromino.map((row, i) => {
                    return (
                        <div key={i} className="row">
                            {row.map((cell, j) => {
                                return (
                                    <div key={j} className={(cell === 0 ? 'cell' : `cell cell__${cell}`)}>
                                        {/* <div className="cell_sparkle"></div> */}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
    }
}
