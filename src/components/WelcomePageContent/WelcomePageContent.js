import React from 'react';
import './WelcomePageContent.scss';

export default function WelcomePageContent() {
    return (
        <section className="content">
            <div className="content__header">
                <h1 className="content__title">
                    tetris
                </h1>
            </div>
            <div className="content__body">
                <p className="content__description">
                    Hey there! Did you want to try out my version of the classic game Tetris? If so, then just put in the name of your choosing and press on the "Play" button!
                </p>
            </div>
        </section>
    )
}