import React from 'react';

import { createRoot } from 'react-dom/client';
import Root from './containers/Root/Root';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configureStore';

const store = configureStore();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root store={store} history={history} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
