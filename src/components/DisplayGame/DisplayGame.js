import { Component } from 'react';
import WelcomePage from '../../Pages/WelcomePage/WelcomePage';
import GamePage from '../../Pages/GamePage/GamePage';

export default class App extends Component {

    state = {
        displayTetris: false,
        username: '',
    }

    displayTetrisHandler = (event) => {
        event.preventDefault();
        // console.log(event.target.Username.value)
        this.setState({displayTetris: true, username: `${event.target.Username.value}`});
    }

    render = () => {
        return (
            (!this.state.displayTetris) 
                ? 
                <WelcomePage displayTetrisHandler={ this.displayTetrisHandler }/>
                : 
                <GamePage username={ this.state.username } pauseModal={ this.state.displayPauseModal }/>
        )
    }
}