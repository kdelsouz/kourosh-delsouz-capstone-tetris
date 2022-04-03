import React from 'react';
import './Leaderboard.scss';

const mockLeaderBoard = [
    
    {
        name: 'player',
        score: 9999
    },
    {
        name: 'player2',
        score: 9999
    },
    {
        name: 'player3',
        score: 9999
    },
    {
        name: 'player4',
        score: 9999
    },
    {
        name: 'player5',
        score: 9999
    },
    {
        name: 'player6',
        score: 9999
    },
    {
        name: 'player7',
        score: 9999
    },
    {
        name: 'player8',
        score: 9999
    },
    {
        name: 'player9',
        score: 9999
    },
    {
        name: 'player10',
        score: 9999
    }
]



export default function Leaderboard() {

    return (
        <section className="leaderboard">
                <div className="leaderboard__list-item--header">
                    <h2>Leaderboard</h2>
                </div>
            <ul className="leaderboard__list">
                {mockLeaderBoard.map((obj, i) => {
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