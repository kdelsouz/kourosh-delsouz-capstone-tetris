import React from 'react';
import axios from 'axios';
import './GamePage.scss';
import TetrisBoard from '../../components/TetrisBoard/TetrisBoard';
import GameScore from '../../components/GameScore/GameScore';
import PreviewTetrominoes from '../../components/PreviewTetrominoes/PreviewTetrominoes';
import { createRandomTetromino } from '../../components/Tetrominoes/Tetrominoes';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

export default class GamePage extends React.Component {

    state = {
        showGameOverModal: false,
        showPausedModal: false,
        gameScore: 0,
        leaderboard: [],
        nextTetrominoesPreview: [
            createRandomTetromino(),
            createRandomTetromino(),
            createRandomTetromino()
        ],
    }

    componentDidMount() {
        axios.get('http://localhost:5050/scores')
            .then((res) => {
                let top10Scores = res.data.sort((scoreObj1, scoreObj2) => {
                    return scoreObj2.score - scoreObj1.score;
                })
                if (top10Scores.length > 10) {
                    top10Scores = top10Scores.slice(0, 10)
                }
                this.setState({ leaderboard: top10Scores })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    toggleShowGameOverModal = () => {
        this.setState({ showGameOverModal: !this.state.showGameOverModal })
    }

    toggleShowGamePausedModal = () => {
        this.setState({ showPausedModal: !this.state.showPausedModal })
    }

    addPointsToScore = () => {
        this.setState({ gameScore: this.state.gameScore + 100 })
    }

    resetScore = () => {
        this.setState({ gameScore: 0 })
    }

    grabNextTetromino = () => {
        let copiedTetrominoesPreview = JSON.parse(JSON.stringify(this.state.nextTetrominoesPreview))
        const nextTetromino = copiedTetrominoesPreview.shift();

        copiedTetrominoesPreview.push(createRandomTetromino());
        this.setState({ nextTetrominoesPreview: copiedTetrominoesPreview })
        return nextTetromino;
    }

    createAndSetPreviewTetrominoes = () => {
        const newPreviewTetrominoes = [
            createRandomTetromino(),
            createRandomTetromino(),
            createRandomTetromino()
        ];

        this.setState({ nextTetrominoesPreview: newPreviewTetrominoes });
        const droppingTetromino = createRandomTetromino();
        return droppingTetromino;
    }

    render() {
        return (
            <>
                <div className="game-page">
                    <div>
                        <GameScore gameScore={this.state.gameScore} />
                        <Leaderboard leaderboard={this.state.leaderboard} />
                    </div>
                    <TetrisBoard createAndSetPreviewTetrominoes={this.createAndSetPreviewTetrominoes} resetScore={this.resetScore} toggleShowGamePausedModal={this.toggleShowGamePausedModal} grabNextTetromino={this.grabNextTetromino} addPoints={this.addPointsToScore} showGameOverModal={this.state.showGameOverModal} createRandomTetromino={this.createRandomTetromino} toggleShowGameOverModal={this.toggleShowGameOverModal} showPausedModal={this.state.showPausedModal} tetrominoesPreview={this.state.tetrominoesPreview} />
                    <PreviewTetrominoes nextTetrominoesPreview={this.state.nextTetrominoesPreview} createRandomTetromino={this.createRandomTetromino} tetrominoesPreview={this.state.nextTetrominoesPreview} toggleShowGamePausedModal={this.toggleShowGamePausedModal} />
                </div>
            </>
        )
    }
}