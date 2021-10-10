import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    switch (error?.response?.status) {
      case 400:
        alert(error.response.data?.data);
        break;
      case 401:
        alert(`Seems like token is not passed. Server responded with status ${error?.response?.status} and message: "${error?.response?.data?.message}"`);
        break;
      case 403:
        alert(`You shall not pass! Server responded with status ${error?.response?.status} and message: "${error?.response?.data?.message}"`);
        break;
      default:
        console.error('Unhandled error occurred\n', error)
        break;
    }

    return Promise.reject(error?.response ?? error);
  }
);

ReactDOM.render(
    <Provider store={store}>
      <CssBaseline/>
      <App/>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
