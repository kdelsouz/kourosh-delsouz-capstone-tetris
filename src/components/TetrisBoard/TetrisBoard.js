import React from 'react';
import './TetrisBoard.scss';
import createTetrominoes from '../Tetrominoes/Tetrominos';

const dropInterval = 1000;


// block droping every second - 1000
// check if next cell is empty and move down - if not stop and reset to next block
// if block reaches max board.length, stop and reset to next block


export default class TetrisBoard extends React.Component {
    state = {
        board: Array(20).fill(0).map(row => new Array(10).fill(0)),
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

    componentDidMount = () => {
        const newBoard = this.state.board;
        const newTetromino = createTetrominoes(this.randomTetromino())

        for(let y = 0; y < newTetromino.length; y++) {
            for(let x = 0; x < newTetromino[y].length; x++) {
                if (newTetromino[y][x]) {
                    newBoard[y][x + 4] = newTetromino[y][x];
                }
            }
        }
        this.setState({board: newBoard});
    }

    componentWillUpdate = () => {
        
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
