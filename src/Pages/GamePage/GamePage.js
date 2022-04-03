import React from 'react';
import './GamePage.scss';
import TetrisBoard from '../../components/TetrisBoard/TetrisBoard';
import GameScore from '../../components/GameScore/GameScore';
import PreviewTetrominoes from '../../components/PreviewTetrominoes/PreviewTetrominoes';
import { createRandomTetromino } from '../../components/Tetrominoes/Tetrominoes';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

export default class GamePage extends React.Component {

    state = {
        isGameOver: false,
        showPausedModal: false,
        gameScore: 0,
        nextTetrominoesPreview: [
            createRandomTetromino(),
            createRandomTetromino(),
            createRandomTetromino()
        ],
    }

    toggleShowGamePausedModal = () => {
        this.setState({ showPausedModal: !this.state.showPausedModal })
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
                    <div>
                        <GameScore gameScore={this.state.gameScore} />
                        <Leaderboard />
                    </div>
                    <TetrisBoard toggleShowGamePausedModal={this.toggleShowGamePausedModal} grabNextTetromino={this.grabNextTetromino} addPoints={this.addPointsToScore} isGameOver={this.state.isGameOver} createRandomTetromino={this.createRandomTetromino} setGameOver={this.setGameOver} showPausedModal={this.state.showPausedModal}  tetrominoesPreview={this.state.tetrominoesPreview} />
                    <PreviewTetrominoes nextTetrominoesPreview={this.state.nextTetrominoesPreview} createRandomTetromino={this.createRandomTetromino} tetrominoesPreview={this.state.nextTetrominoesPreview} toggleShowGamePausedModal={this.toggleShowGamePausedModal} />
                </div>
            </>
        )
    }
}