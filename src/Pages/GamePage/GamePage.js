import React from 'react';
import Tetris from '../../components/Tetris/Tetris';

export default function GamePage(props) {
    return (
        <>
            <div>
                <h1>{props.username}</h1>
                <Tetris />
                {/* <GameStats />
                <Previews />
                <GameController /> */}
            </div>
        </>
    )
}