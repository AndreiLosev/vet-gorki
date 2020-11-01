import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {rootReduser} from './redusers'
import thunk from 'redux-thunk'
import {NavigatorContext} from './navigation'
import {Login, Clients, PetCard, Print} from './pages'


const store = createStore(rootReduser, applyMiddleware(thunk))

const App: React.FC = () => {
  const {login, clients, petCart, print} = React.useContext(NavigatorContext)
  return (
    <Provider store={store}>
      {login ? <Login /> : null}
      {clients ? <Clients /> : null}
      {petCart ? <PetCard /> : null}
      {print ? <Print /> : null}
    </Provider>
  );
}

export default App;
