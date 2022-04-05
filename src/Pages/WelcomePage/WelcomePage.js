import React from 'react';
import './WelcomePage.scss';
import WelcomePageContent from '../../components/WelcomePageContent/WelcomePageContent';
import InputName from '../../components/InputName/InputName';
import controlsImg from '../../assets/images/controls-img.png';

export default function WelcomePage(props) {
    return (
        <>
            <ul>
                <li>
                    <WelcomePageContent />
                </li>
                <li>
                    <InputName displayTetrisHandler={ props.displayTetrisHandler } inputError={ props.inputError } />
                </li>
                <li>
                    <img className='controls-img' src={controlsImg} alt='display for keybinds and controls'/>
                </li>
            </ul>
        </>
    )
}