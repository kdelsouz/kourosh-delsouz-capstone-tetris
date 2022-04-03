import React from 'react';
import './GamePage.scss';
import TetrisBoard from '../../components/TetrisBoard/TetrisBoard';
import GameScore from '../../components/GameScore/GameScore';
import PauseMenuModal from '../../components/PauseMenuModal/PauseMenuModal';
import GameOverModal from '../../components/GameOverModal/GameOverModal';
import PreviewTetrominoes from '../../components/PreviewTetrominoes/PreviewTetrominoes';
import createTetromino from '../../components/Tetrominoes/Tetrominos';

export default class GamePage extends React.Component {

    state = {
        isGameOver: false,
        isGamePaused: false,
        gameScore: 0,
        nextTetrominoesPreview: [
            [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]],

            [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]],

            [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]]
            
        ],
    }

    componentDidMount() {
        this.setState({ nextTetrominoesPreview: [
            this.createRandomTetromino().grid,
            this.createRandomTetromino().grid,
            this.createRandomTetromino().grid
        ] })
    }

    setGameOver = () => {
        this.setState({ isGameOver: true })
    }
    
     //function to spit out a random string corresponding to their tetromino
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

    render() {
        return (
            <>
                <div className="game-page">
                    <GameScore gameScore={this.state.gameScore} />
                    <TetrisBoard isGameOver={this.state.isGameOver} createRandomTetromino={this.createRandomTetromino} setGameOver={this.setGameOver} isGamePaused={this.state.isGamePaused} gameScore={this.state.gameScore} tetrominoesPreview={this.state.tetrominoesPreview} />
                    <PreviewTetrominoes nextTetrominoesPreview={this.state.nextTetrominoesPreview} createRandomTetromino={this.createRandomTetromino} tetrominoesPreview={this.state.nextTetrominoesPreview} />
                </div>
                {/* <PauseMenuModal /> */}
                {/* {this.state.isGameOver &&
                    <GameOverModal username={this.props.username} />
                } */}
            </>
        )
    }
}