import React from 'react';
import './TetrisBoard.scss';
import createTetrominoes from '../Tetrominoes/Tetrominos';

export default class TetrisBoard extends React.Component {
    state = {
        board: Array(20).fill(0).map(row => new Array(10).fill(0)),
        count: 0,
    }

    randomTetromino = () => {
        const tetrominos = [
            'T',
            'O',
            'L',
            'J',
            'I',
            'S',
            'Z',
        ];
        return(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
    }

    newBoard = () => {
        const newBoard = this.state.board;
        let newTetromino = createTetrominoes(this.randomTetromino())

        for(let y = 0; y < newTetromino.length; y++) {
            for(let x = 0; x < newTetromino[y].length; x++) {
                if (newTetromino[y][x]) {
                    newBoard[y][x + 4] = newTetromino[y][x];
                }
            }
        }
        if(this.state.count > 17 ) {
            this.setState({board: newBoard, count: 0});
        } else {
            this.setState({board: newBoard});
        }
    }

    moveBoard = () => {
        const newBoard = Array(20).fill(0).map(row => new Array(10).fill(0));
        // const newTetromino = createTetrominoes(this.randomTetromino())

        for(let y = 0; y < newBoard.length; y++) {
            for(let x = 0; x < newBoard[y].length; x++) {
                if (this.state.board[y][x] && y < newBoard.length - 1) {
                    newBoard[y+1][x] = this.state.board[y][x];
                }
            }
        }
        if(this.state.count > 17 ) {
            this.newBoard();
        } else {
            this.setState({board: newBoard, count: this.state.count+ 1});
        }
    }


    componentDidMount = () => {
        this.newBoard();
        setInterval(()=> {
            this.moveBoard();
        },500)
    }

    componentDidUpdate = () => {
        // this.newBoard(this.state.count);
        // setTimeout(() => {
        //     this.moveBoard();
        // }, 1000)
    }

    render = () => {
        console.table(this.state.board)
        return (
            <>
                {this.state.board.map(row => {
                    return (
                        <div className="row">
                            {row.map(cell => {
                                return (
                                    <div className={(cell === 0 ? 'cell' : `cell cell__${cell}`)}>
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
