import React from 'react';
import './GamePage.scss';
import Tetris from '../../components/Tetris/Tetris';
import GameScore from '../../components/GameScore/GameScore';
import GameMenuModal from '../../components/GameMenuModal/GameMenuModal';

export default function GamePage(props) {
    return (
        <>
            <div className="game-page">
                <GameScore />
                <Tetris />
                {/* <Previews /> */}
                <GameMenuModal />
            </div>
        </>
    )
}