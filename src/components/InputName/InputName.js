import React from 'react';
import './InputName.scss';

export default function InputName({ displayTetrisHandler, inputError }) {
    return (
        <>
            <form className="form__container" onSubmit={ displayTetrisHandler }>
                <div className="form">
                    <input className={ (inputError) ? 'form__input--error' : 'form__input' } type="text" name="username" placeholder="Name" />
                    <button className="form__button button">
                        Play
                    </button>
                </div>
            </form>
        </>
    )
}