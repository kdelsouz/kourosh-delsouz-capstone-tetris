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
                    <InputName displayTetrisHandler={ props.displayTetrisHandler }/>
                </li>
            </ul>
        </>
    )
}