import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './components/app';
import css from './sass/style.sass';

render(<App txt="React" />, document.getElementById('root'));
