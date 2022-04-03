import React from 'react';
import './TetrisBoard.scss';
import GameOverModal from '../GameOverModal/GameOverModal';
import PauseMenuModal from '../PauseMenuModal/PauseMenuModal';

export default class TetrisBoard extends React.Component {
    state = {
        board: Array(20).fill(0).map(row => new Array(10).fill(0)),
        fallingTetromino: null,
        tetrominoPosition: [0, 4],
        dropTimer: null,
    }


    // Making a copy of board in state and storing in a variable
    // Keydown event listeners for user input and their respective functions
    componentDidMount = () => {
        const newTetromino = this.props.grabNextTetromino()
        const newBoard = this.state.board.map((arr) => { return arr.slice(); });

        document.addEventListener('keydown', event => {
            event.preventDefault();
            if (this.props.showPausedModal) {
                return;
            }
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


    //function to check for collision on all sides of the board and other merged tetrominos
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

    //function to clear completed lines
    clearAllFullLines = (board) => {
        const rowsToRemove = [];

        for (let y = 0; y < board.length; y++) {
            let countCellsFilled = 0;
            for (let x = 0; x < board[y].length; x++) {
                if (board[y][x] !== 0) {
                    countCellsFilled++
                }
            }
            if (countCellsFilled === 10) {
                rowsToRemove.push(y)
            }
        }
        rowsToRemove.forEach((rowYValue) => {
            this.props.addPoints()
            board.splice(rowYValue, 1);
            board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        })
    }

    //function to shift tetromino left on the x(column) axis, while also checking for collisions
    tetrominoShiftLeft = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY, boardX - 1);

        if (!isColliding) {
            let newTetrominoPos = this.state.tetrominoPosition
            newTetrominoPos[1] = newTetrominoPos[1] - 1
            this.setState({ tetrominoPosition: newTetrominoPos })
        }
    }

    //function to shift tetromino right on the x(column) axis, while also checking for collisions
    tetrominoShiftRight = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY, boardX + 1);

        if (!isColliding) {
            let newTetrominoPos = this.state.tetrominoPosition
            newTetrominoPos[1] = newTetrominoPos[1] + 1
            this.setState({ tetrominoPosition: newTetrominoPos })
        }
    }

    //function to rotate tetromino by transposing and reversing the values of the tetromino grid, while also checking for collisions
    tetrominoRotate = (board, tetromino, boardY, boardX) => {
        const tetrominoGrid = tetromino.grid;
        const tetrominoGridCopy = tetrominoGrid.map((arr) => { return arr.slice(); });

        //function and algorithm to transpose and reverse values of the tetromino grid
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

    //function to drop the falling tetromino by 1 on the y(row) axis, while checking for collision
    tetrominoDropOne = (board, tetromino, boardY, boardX) => {
        const isColliding = this.checkCollision(board, tetromino, boardY + 1, boardX);

        if (!isColliding) {
            let newTetrominoPos = this.state.tetrominoPosition;
            newTetrominoPos[0] = newTetrominoPos[0] + 1;
            clearInterval(this.state.dropTimer);
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
        this.clearAllFullLines(newBoard)
        const newTetromino = this.props.grabNextTetromino();
        if (this.checkCollision(newBoard, newTetromino, 0, 4)) {
            this.props.toggleShowGameOverModal();
            clearInterval(this.state.dropTimer);
        }

        this.setState({
            board: newBoard,
            fallingTetromino: newTetromino,
            tetrominoPosition: [0, 4],
        })
    }

    pauseTimeInterval = () => {
        this.props.toggleShowGamePausedModal();
        clearInterval(this.state.dropTimer);
    }
    
    resumeTimeInterval = () => {
        this.props.toggleShowGamePausedModal();
        this.setState({ dropTimer: setInterval(this.dropTetrominoInterval, 1000) })
        
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

    restartGame = (toggleModal) => {
        toggleModal();
        const resettedBoard = Array(20).fill(0).map(row => new Array(10).fill(0));
        this.props.resetScore();
        const droppingTetromino = this.props.createAndSetPreviewTetrominoes();
        clearInterval(this.state.dropTimer);

        this.setState({ board: resettedBoard, fallingTetromino: droppingTetromino, tetrominoPosition: [0, 4], dropTimer: setInterval(this.dropTetrominoInterval, 1000) })
    }

    render = () => {
        const boardWithTetromino = this.state.board.map((arr) => { return arr.slice(); });
        if (this.state.fallingTetromino) {
            this.mergeTetromino(boardWithTetromino, this.state.fallingTetromino, this.state.tetrominoPosition[0], this.state.tetrominoPosition[1]);
        }

        return (
            <div className="tetris-board">
                {boardWithTetromino.map((row, i) => {
                    return (
                        <div key={i} className="row">
                            {row.map((cell, j) => {
                                return (
                                    <div key={j} className={(cell === 0 ? 'cell' : `cell cell__${cell} `)}>
                                        <div className={(cell === 0 ? '' : 'cell__sparkle')}></div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <div className="preview__button">
                    <button className="preview__pause" onClick={this.pauseTimeInterval} >
                        Pause
                    </button>
                </div>
                {this.props.showPausedModal && 
                    <PauseMenuModal restartGame={this.restartGame} toggleShowGamePausedModal={this.props.toggleShowGamePausedModal} resumeTimeInterval={this.resumeTimeInterval}/>
                }
                {this.props.showGameOverModal &&
                    <GameOverModal restartGame={this.restartGame} toggleShowGameOverModal={this.props.toggleShowGameOverModal} username={this.props.username} gameScore={this.state.gameScore} />
                }
            </div>
        )
    }
}
