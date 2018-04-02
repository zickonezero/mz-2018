import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './global.css';
import App from './App';

import './lib/js/jquery-1.8.3.js';
import './lib/js/jquery-ui-1.9.1.js';

import bootstrap from 'bootstrap';

import './lib/js/ascensor.min.js';
import './lib/js/jquery.scrollTo-1.4.3.1-min.js';

import './lib/js/fancybox/source/jquery.fancybox.css';
import './lib/js/fancybox/source/helpers/jquery.fancybox-buttons.css';
import './lib/js/fancybox/source/helpers/jquery.fancybox-thumbs.css';

import './lib/js/jquery.easing-1.3.js';
import './lib/js/fancybox/lib/jquery.mousewheel-3.0.6.pack.js';
import './lib/js/fancybox/source/jquery.fancybox.pack.js';
import './lib/js/fancybox/source/helpers/jquery.fancybox-buttons.js';
import './lib/js/fancybox/source/helpers/jquery.fancybox-media.js';
import './lib/js/fancybox/source/helpers/jquery.fancybox-thumbs.js';

import './global.js';

const app = (
    <App />
);

ReactDOM.render(app, document.getElementById('root'));
