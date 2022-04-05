import React from 'react';
import WelcomePageContent from '../../components/WelcomePageContent/WelcomePageContent';
import InputName from '../../components/InputName/InputName';

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
<<<<<<< Updated upstream
=======
                <li>
                    <img className='controls-img' src={controlsImg} alt='display for keybinds and controls'/>
                </li>
>>>>>>> Stashed changes
            </ul>
        </>
    )
}