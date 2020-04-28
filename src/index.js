import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import Firebase from './Firebase/firebase.config';
import FirebaseContext from './Firebase/context';
import { StoreProvider, StoreConsumer } from './store/store.context';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import Header from './components/header/Header';

import StartView from './views/StartView/StartView';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <StoreProvider>
          <Header />
          <Switch>
            <Route path="/">
              <FirebaseContext.Consumer>
                  {firebase => 
                    <StoreConsumer>
                      {store => <StartView firebase={firebase}
                                            store={store}/>}
                    </StoreConsumer>}
              </FirebaseContext.Consumer>
            </Route>
          </Switch>
        </StoreProvider>
      </BrowserRouter>
    </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
