import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import UserRepos from './components/UserRepos/UserRepos';

import { UserDataProvider } from './context/userDataContext';
import { LoggedProvider } from './context/loggedContext';

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
  const [userData, setUserData] = useState({});
  const [logged, setLogged] = useState(false);

  return (
    <div className="App">
        <LoggedProvider value={{ logged, setLogged }}>
          <Header />
      <main>
          <UserDataProvider value={{ userData, setUserData }}>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/search" component={Search} />
                <Route
                  exact
                  path="/user-repos/:username"
                  component={UserRepos}
                />
              </Switch>
            </Router>
          </UserDataProvider>
      </main>
        </LoggedProvider>

      <Footer />
    </div>
  );
}

export default App;
