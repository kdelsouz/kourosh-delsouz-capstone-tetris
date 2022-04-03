import React from 'react';
import './PreviewTetrominoes.scss';

export default function PreviewTetrominoes() {

    return (
        <section className="preview">
            <div className="preview__header">
                <h2 className="preview__text">
                    Preview
                </h2>
            </div>
            <ul className="preview__tetrominoes">
                <li className="preview__tetromino">
                    <div></div>
                </li>
                <li className="preview__tetromino">
                    <div></div>
                </li>
                <li className="preview__tetromino">
                    <div></div>
                </li>
                <li className="preview__button">
                    <button className="preview__pause">
                        Pause
                    </button>
                </li>
            </ul>
        </section>
        )
}