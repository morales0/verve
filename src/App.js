import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDatabase, useDatabaseObjectData } from 'reactfire';
import 'firebase/database';
import { Home, Workout } from './pages';

/* 
Providers:
Firebase: Auth, User, and Database
Theme Provider
*/

function App() {
  const db = useDatabase()
  const ref = db.ref('users')
  const { status, data } = useDatabaseObjectData(ref)

  useEffect(() => {
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    });
  }, [])

  useEffect(() => {
    console.log(status, data)
  }, [status])

  if (status === 'loading') {
    return <h3>Loading</h3>
  }

  return (
    <Router>
      <nav>
        
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
