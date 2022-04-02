import React from 'react';
import './TetrisBoard.scss';
import createTetromino from '../Tetrominoes/Tetrominos';

export default class TetrisBoard extends React.Component {
    state = {
        board: Array(20).fill(0).map(row => new Array(10).fill(0)),
        isGameOver: false,
        fallingTetromino: null,
        tetrominoPosition: [0, 4],
        dropTimer: null,
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

    tetrominoShiftLeft = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY, boardX - 1);

        if (!isColliding) {
            let newTetrominoPos = this.state.tetrominoPosition
            newTetrominoPos[1] = newTetrominoPos[1] - 1
            this.setState({ tetrominoPosition: newTetrominoPos })
        }
    }

    tetrominoShiftRight = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY, boardX + 1);

        if (!isColliding) {
            let newTetrominoPos = this.state.tetrominoPosition
            newTetrominoPos[1] = newTetrominoPos[1] + 1
            this.setState({ tetrominoPosition: newTetrominoPos })
        }
    }

    tetrominoRotate = (board, tetromino, boardY, boardX) => {
        const tetrominoGrid = tetromino.grid;
        const tetrominoGridCopy = tetrominoGrid.map((arr) => { return arr.slice(); });

        for (let y = 0; y < tetrominoGrid.length; y++) {
            for (let x = 0; x < tetrominoGrid[y].length; x++) {
                tetrominoGridCopy[y][x] = tetrominoGrid[x][y]
            }
            tetrominoGridCopy[y].reverse();
        }
        const rotatedTetromino = { grid: tetrominoGridCopy, type: tetromino.type }
        const isColliding = this.checkCollision(board, rotatedTetromino, boardY, boardX)

        if (isColliding) {
            return;
        }
        this.setState({ fallingTetromino: rotatedTetromino })
    }

    tetrominoDropOne = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY + 1, boardX);

        if (!isColliding) {
            let newTetrominoPos = this.state.tetrominoPosition;
            newTetrominoPos[0] = newTetrominoPos[0] + 1;
            clearInterval(this.state.dropTimer);
            console.log(this.state.dropTimer)
            this.setState({ tetrominoPosition: newTetrominoPos, dropTimer: setInterval(this.dropTetrominoInterval, 1000) });
        }
    }

    tetrominoDropMax = (board, tetromino, boardY, boardX) => {
        let newBoardY = boardY + 1;
        let isColliding = this.checkCollision(board, tetromino, newBoardY, boardX);

        while (!isColliding) {
            newBoardY++
            isColliding = this.checkCollision(board, tetromino, newBoardY, boardX)
        }
        newBoardY--

        this.mergeThenResetTetromino(tetromino, newBoardY, boardX);
    }

    mergeTetromino = (board, tetromino, boardY, boardX) => {
        const blockPositions = this.getBlockPositions(tetromino.grid, boardY, boardX);

        for (let i = 0; i < blockPositions.length; i++) {
            const currentPosition = blockPositions[i]

            board[currentPosition[0]][currentPosition[1]] = tetromino.type
        }
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

    mergeThenResetTetromino = (tetromino, boardY, boardX) => {
        const newBoard = this.state.board.map((arr) => { return arr.slice(); });
        this.mergeTetromino(newBoard, tetromino, boardY, boardX);
        const newTetromino = this.createRandomTetromino();

        this.setState({
            board: newBoard,
            fallingTetromino: newTetromino,
            tetrominoPosition: [0, 4]
        })
    }

    autoTetrominoDrop = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY + 1, boardX);

        if (isColliding) {
            this.mergeThenResetTetromino(tetromino, boardY, boardX);
            return;
        }

        this.setState({ tetrominoPosition: [boardY + 1, boardX] })
    }

    dropTetrominoInterval = () => {
        this.autoTetrominoDrop(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
    }

    componentDidMount = () => {
        const newTetromino = this.createRandomTetromino()
        const newBoard = this.state.board.map((arr) => { return arr.slice(); });

        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (event.key === "ArrowLeft") {
                this.tetrominoShiftLeft(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
            }
            else if (event.key === "ArrowRight") {
                this.tetrominoShiftRight(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
            }
            else if (event.key === "ArrowDown") {
                this.tetrominoDropOne(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
            }
            else if (event.key === "ArrowUp") {
                this.tetrominoRotate(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
            }
            else if (event.code === "Space") {
                this.tetrominoDropMax(this.state.board, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1])
            }
        });

        this.setState({
            fallingTetromino: newTetromino, board: newBoard, dropTimer: setInterval(this.dropTetrominoInterval, 1000)
        })

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
