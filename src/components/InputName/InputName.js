import React from 'react';
import './InputName.scss';

export default function InputName({ displayTetrisHandler }) {
    return (
        <>
            <form className="form__container" onSubmit={ displayTetrisHandler }>
                <div className="form">
                    <input className="form__input" type="text" name="Username" placeholder="Name" />
                    <button className="form__button button">
                        Play
                    </button>
                </div>
            </form>
        </>
    )
}