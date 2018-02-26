import React           from 'react';
import ReactDOM        from 'react-dom';
import { createStore } from 'redux';

import Form           from './form.jsx';
import processReducer from './reducer.js';

// Inicializamos el store pasándole el reducer
const store = createStore(processReducer);

//Renderizo
const render = () => {

  ReactDOM.render(<Form value      = {store.getState()}
                        onProcess  = {(val)=> store.dispatch(val)}/>,
                  document.getElementById('app'));

};

store.subscribe(render);
render();
