import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'
import { DataProvider } from './Components/DataContext'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DataProvider>
        <App />
      </DataProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);