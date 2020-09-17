import React from 'react'
import {useRoutes, useRedirect} from 'hookrouter';
import {Login} from './pages/login/login'
import {Clients} from './pages/clients/clients'
import {PetCard} from './pages/petCard/petCard'

const routes = {
  '/login': () => <Login />,
  '/clients': () => <Clients />,
  '/petCard': () => <PetCard />
};

const App: React.FC = () => {
  useRedirect('/', '/login');
  const routeResult = useRoutes(routes);  
  return (
    <>
      {routeResult || <h1>NotFound</h1>}
    </>
  );
}

export default App;
