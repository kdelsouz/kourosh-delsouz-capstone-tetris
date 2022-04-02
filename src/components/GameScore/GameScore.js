import React from "react";
import './GameScore.scss';

export default function GameScore() {

    return (
            <section className="game-score">
                <div className="game-score__header">
                    <h2 className="game-score__text">Score:</h2>
                </div>
                <div className="game-score__container">
                    <h2 className="game-score__score">9999</h2>
                </div>
            </section>
    )
}