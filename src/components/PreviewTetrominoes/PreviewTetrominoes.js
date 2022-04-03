import React from 'react';
import './PreviewTetrominoes.scss';

export default function PreviewTetrominoes(props) {

    console.log(props.nextTetrominoesPreview)

    return (
        <section className="preview">
            <div className="preview__header">
                <h2 className="preview__text">
                    Preview
                </h2>
            </div>
            <ul className="preview__tetrominoes">
                {/* map through each grid */}
                {props.nextTetrominoesPreview.length > 0 && props.nextTetrominoesPreview.map((nextTetromino, i) => (
                    <li key={i}>
                        <div>
                            {/* mapping through rows */}
                            {nextTetromino.grid.map((row, j) => {
                                return (
                                    <div key={j} className="row">
                                        {/* mapping through cells */}
                                        {row.map((cell, k) => {
                                            return (
                                                <div key={k} className={(cell === 0 ? 'cell' : `cell cell__${cell} `)}>
                                                    <div className={(cell === 0 ? '' : 'cell__sparkle')}></div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </li>
                ))
                }
                <li className="preview__button">
                    <button className="preview__pause">
                        Pause
                    </button>
                </li>
            </ul>
        </section>
    )
}