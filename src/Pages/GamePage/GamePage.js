import React from 'react';
import './GamePage.scss';
import Tetris from '../../components/Tetris/Tetris';
import GameScore from '../../components/GameScore/GameScore';
import PauseMenuModal from '../../components/PauseMenuModal/PauseMenuModal';

export default function GamePage(props) {
    console.log(props)

    return (
        <>
            <div className="game-page">
                <GameScore />
                <Tetris />
                {/* <Previews /> */}
                <PauseMenuModal />
            </div>
        </>
    )
}