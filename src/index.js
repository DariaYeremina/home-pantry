import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import Firebase from './Firebase/firebase.config';
import FirebaseContext from './Firebase/context';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import Header from './components/header/Header';

import StartView from './views/StartView/StartView';

ReactDOM.render(
  // <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/">
            {/* <StartView /> */}
            <FirebaseContext.Consumer>
                {firebase => <StartView firebase={firebase}/>}
            </FirebaseContext.Consumer>
          </Route>
        </Switch>
      </BrowserRouter>
    </FirebaseContext.Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
