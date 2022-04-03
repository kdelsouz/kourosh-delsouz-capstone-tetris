import React from "react";
import './GameScore.scss';

export default function GameScore({ gameScore }) {

    return (
            <section className="game-score">
                <div className="game-score__header">
                    <h2 className="game-score__text">Score:</h2>
                </div>
                <div className="game-score__container">
                    <h2 className="game-score__score">{gameScore}</h2>
                </div>
            </section>
    )
}