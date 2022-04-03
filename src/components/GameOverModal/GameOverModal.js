import React from 'react';
import './GameOverModal.scss';

export default function PauseMenuModal({ username, gameScore }) {

    return (
        <div className="modal-background">
            <section className="game-over">
                <div className="game-over__text">
                    <h2 className="game-over__name">Way to go {username}!</h2>
                    <p className="game-over__points">
                        You scored {gameScore} points, do you want to play again?
                    </p>
                </div>
                <div className="game-over__button-container">
                    <button className="game-over__restart">
                        Restart
                    </button>
                </div>
            </section >
        </div >
    )
}