import React from 'react';
import './GamePage.scss';
import TetrisBoard from '../../components/TetrisBoard/TetrisBoard';
import GameScore from '../../components/GameScore/GameScore';
import PauseMenuModal from '../../components/PauseMenuModal/PauseMenuModal';
import GameOverModal from '../../components/GameOverModal/GameOverModal';
import PreviewTetrominoes from '../../components/PreviewTetrominoes/PreviewTetrominoes';
import { createRandomTetromino } from '../../components/Tetrominoes/Tetrominoes';

export default class GamePage extends React.Component {

    state = {
        isGameOver: false,
        isGamePaused: false,
        gameScore: 0,
        nextTetrominoesPreview: [
            createRandomTetromino(),
            createRandomTetromino(),
            createRandomTetromino()
        ],
    }

    grabNextTetromino = () => {
        let copiedTetrominoesPreview = JSON.parse(JSON.stringify(this.state.nextTetrominoesPreview))
        const nextTetromino = copiedTetrominoesPreview.shift();
        
        copiedTetrominoesPreview.push(createRandomTetromino());
        this.setState({ nextTetrominoesPreview: copiedTetrominoesPreview })
        return nextTetromino;
    }

    setGameOver = () => {
        this.setState({ isGameOver: true })
    }

    render() {
        return (
            <>
                <div className="game-page">
                    <GameScore gameScore={this.state.gameScore} />
                    <TetrisBoard grabNextTetromino={this.grabNextTetromino} isGameOver={this.state.isGameOver} createRandomTetromino={this.createRandomTetromino} setGameOver={this.setGameOver} isGamePaused={this.state.isGamePaused} gameScore={this.state.gameScore} tetrominoesPreview={this.state.tetrominoesPreview} />
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