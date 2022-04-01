import React from 'react';
import Tetris from '../../components/Tetris/Tetris';
import './GamePage.scss';

export default function GamePage(props) {
    return (
        <>
            <div className="game-page">
                <Tetris />
                {/* <GameStats />
                <Previews />
                <GameController /> */}
            </div>
        </>
    )
}