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

    toggleGamePause = () => {
        this.setState({ isGamePaused: true })
    }

    addPointsToScore = () => {
        this.setState({ gameScore: this.state.gameScore + 100 })
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
                    <TetrisBoard grabNextTetromino={this.grabNextTetromino} addPoints={this.addPointsToScore} isGameOver={this.state.isGameOver} createRandomTetromino={this.createRandomTetromino} setGameOver={this.setGameOver} isGamePaused={this.state.isGamePaused}  tetrominoesPreview={this.state.tetrominoesPreview} />
                    <PreviewTetrominoes nextTetrominoesPreview={this.state.nextTetrominoesPreview} createRandomTetromino={this.createRandomTetromino} tetrominoesPreview={this.state.nextTetrominoesPreview} toggleGamePause={this.toggleGamePause} />
                </div>
                {this.state.isGamePaused && 
                    <PauseMenuModal toggleGamePause={this.toggleGamePause}/>
                }
                {this.state.isGameOver &&
                    <GameOverModal toggleGamePause={this.toggleGamePause} username={this.props.username} gameScore={this.state.gameScore} />
                }
            </>
        )
    }
}