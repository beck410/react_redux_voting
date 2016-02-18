import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Wizard of Oz', 'Sound of Music'];

ReactDOM.render(
    <Voting pair={pair} />,
    document.getElementById('app')
)
