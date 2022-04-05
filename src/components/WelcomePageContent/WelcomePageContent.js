import React from 'react';
import './WelcomePageContent.scss';
import tetrisHero from '../../assets/images/tetris-hero.png';

export default function WelcomePageContent() {
    return (
        <section className="content">
            <div className="content__header">
                <img className="content__hero-img" src={tetrisHero} alt='tetris' /> 
            </div>
            <div className="content__body">
                <p className="content__description">
                    Hey there! Did you want to try out my version of the classic game Tetris? If so, then make sure to take a look at the keybinds, put in a name and click on "Play"!
                </p>
            </div>
        </section>
    )
}