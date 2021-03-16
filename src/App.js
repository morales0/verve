import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Workout } from './pages';

/* 
Providers:
Firebase: Auth, User, and Database
Theme Provider

*/
function App() {
  return (
    <Router>
      <nav>
        Navbar
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/workout">
          <Workout/>
        </Route>

        <Route path="/history">
          <div>History</div>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
