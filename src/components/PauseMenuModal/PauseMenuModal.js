import React from 'react';
import './PauseMenuModal.scss';

export default function PauseMenuModal(props) {

    return (
        <div className="modal-background">
            <section className="pause">
                {/* <div>
                    <VolumeSlider />
                </div> */}
                <div className="pause__button-container">
                    <button className="pause__restart">
                        Restart
                    </button>
                </div>
                <div className="pause__button-container">
                    <button className="pause__resume" onClick={props.resumeTimeInterval}>
                        Resume 
                    </button>
                </div>
            </section>
        </div>
    )
}