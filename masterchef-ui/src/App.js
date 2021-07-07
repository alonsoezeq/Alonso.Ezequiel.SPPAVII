import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';
import { AppContext } from './contexts/AppContext';
import ChefsPage from './pages/ChefsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [ context, setContext ] = useState({
    loading: false,
    token: null
  });

  const { loading, token } = context;

  useEffect(() => {
    setContext({ ...context, token: localStorage.getItem('token') });
  }, []);

  return (
    <Router>
      <AppContext.Provider value={[ context, setContext ]}>
        <div className="container">
          <Header title={'Masterchef'}/>
          <Switch>
            { !token && <Route exact path="/"><LoginPage /></Route> }
            { !token && <Route exact path="/register"><RegisterPage /></Route> }
            { token && <Route exact path="/"><ChefsPage /></Route> }
          </Switch>
          {
            loading && <Loader className="container-loader" />
          }
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
