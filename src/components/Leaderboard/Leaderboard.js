import React from 'react';
import './Leaderboard.scss';

export default function Leaderboard(props) {

    return (
        <section className="leaderboard">
                <div className="leaderboard__list-item--header">
                    <h2>Leaderboard</h2>
                </div>
            <ul className="leaderboard__list">
                {props.leaderboard.map((obj, i) => {
                    return (
                        <li key={i} className="leaderboard__list-item">
                            <h3>{i + 1}</h3>
                            <h3>{obj.name}</h3>
                            <h3>{obj.score}</h3>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}