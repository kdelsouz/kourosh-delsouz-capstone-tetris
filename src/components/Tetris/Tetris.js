import React from 'react';
import TetrisBoard from '../TetrisBoard/TetrisBoard';
import './Tetris.scss';

export default function Tetris() {
    return (
        <> 
            <div className="board__container">
                <TetrisBoard />
            </div>
        </>
    )
}