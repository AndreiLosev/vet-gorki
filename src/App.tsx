import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {rootReduser} from './redusers'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Clients, PetCard} from './pages'


const store = createStore(rootReduser, applyMiddleware(thunk))

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/login' />
          <Route path='/login' component={Login} />
          <Route path='/clients' component={Clients} />
          <Route path='/petCard' component={PetCard} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
