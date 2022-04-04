import React from 'react';
import './WelcomePageContent.scss';
import tetrisHero from '../../assets/images/tetris-hero.png';

export default function WelcomePageContent() {
    return (
        <section className="content">
            <div className="content__header">
                <img className="content__hero-img" src={tetrisHero} /> 
            </div>
            <div className="content__body">
                <p className="content__description">
                    Hey there! Did you want to try out my version of the classic game Tetris? If so, then just put in the name of your choosing and press on the "Play" button!
                </p>
            </div>
        </section>
    )
}