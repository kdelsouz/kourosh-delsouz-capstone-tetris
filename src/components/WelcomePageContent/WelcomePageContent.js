import React from 'react';
import './WelcomePageContent.scss';

export default function WelcomePageContent() {
    return (
        <section className="content">
            <div className="content__header">
<<<<<<< Updated upstream
                <h1 className="content__title">
                    tetris
                </h1>
=======
                <img className="content__hero-img" src={tetrisHero} alt='tetris' /> 
>>>>>>> Stashed changes
            </div>
            <div className="content__body">
                <p className="content__description">
                    Hey there! Did you want to try out my version of the classic game Tetris? If so, then make sure to take a look at the keybinds, put in a name and click on "Play"!
                </p>
            </div>
        </section>
    )
}