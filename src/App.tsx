import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {rootReduser} from './redusers'
import thunk from 'redux-thunk'
import {useRoutes, useRedirect} from 'hookrouter'
import {Login, Clients, PetCard} from './pages'


const routes = {
  '/login': () => <Login />,
  '/clients': () => <Clients />,
  '/petCard': () => <PetCard />
};

const store = createStore(rootReduser, applyMiddleware(thunk))

const App: React.FC = () => {
  useRedirect('/', '/login');
  const routeResult = useRoutes(routes);  
  return (
    <Provider store={store}>
      {routeResult || <h1>NotFound</h1>}
    </Provider>
  );
}

export default App;
