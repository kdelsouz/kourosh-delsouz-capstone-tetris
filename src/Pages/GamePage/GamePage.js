import React from 'react';
import './GamePage.scss';
import TetrisBoard from '../../components/TetrisBoard/TetrisBoard';
import GameScore from '../../components/GameScore/GameScore';
import PauseMenuModal from '../../components/PauseMenuModal/PauseMenuModal';
import GameOverModal from '../../components/GameOverModal/GameOverModal';
import PreviewTetrominoes from '../../components/PreviewTetrominoes/PreviewTetrominoes';

export default class GamePage extends React.Component {

    state = {
        isGameOver: false,
        isGamePaused: false,
        gameScore: 0,
        nextTetrominoesPreview: [],
    }

    setGameOver = () => {
        this.setState({ isGameOver: true })
    }

    render() {
        return (
            <>
                <div className="game-page">
                    <GameScore gameScore={this.state.gameScore} />
                    <TetrisBoard isGameOver={this.state.isGameOver} setGameOver={this.setGameOver} isGamePaused={this.state.isGamePaused} gameScore={this.state.gameScore} tetrominoesPreview={this.state.tetrominoesPreview} />
                    <PreviewTetrominoes tetrominoesPreview={this.state.nextTetrominoesPreview} />
                </div>
                {/* <PauseMenuModal /> */}
                {this.state.isGameOver &&
                    <GameOverModal username={this.props.username} />
                }
            </>
        )
    }
}