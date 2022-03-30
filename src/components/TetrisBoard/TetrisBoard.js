import React from 'react';

export default class TetrisBoard extends React.Component {
    state = {
        board: Array(20).fill(0).map(row => new Array(10).fill(0))
    }

    render = () => {
        return (
            <>
            </>
        )
    }
}