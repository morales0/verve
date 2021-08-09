import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth, useDatabase, useDatabaseObjectData, useUser } from 'reactfire';
import { Data, History, Home, SignIn, SignUp, Workout } from './pages';
import { useAuthCheck } from './context/auth';
import { GuestNavbar, UserNavbar, PrivateRoute } from './components';
import { ThemeProvider } from 'styled-components';

/* 
Providers:
Firebase: Auth, User, and Database
Theme Provider
*/

const routes = ["/signIn", "/signUp", "./workouts", "/history", "/user"]

// This will be to test out themes and colors site wide
const draft_theme = {
   main: {
      theme: 'main',
      fg: '#333',
      bg: '#fefefe'
   }, 
   dark: {
      theme: 'dark',
      fg: '#fff',
      bg: '#404040'
   }
}

function App() {
   const authCheck = useAuthCheck()
   const auth = useAuth()

   useEffect(() => {
      console.log("App", authCheck.user)
   });

   return (
      <ThemeProvider theme={draft_theme}>
         <Router>
            {/* Render appropriate navbar */}
            {authCheck.authenticated ? (
               <UserNavbar/>
            ) : (
               <GuestNavbar />
            )}
         
            {/* Render the page component (depending on auth status) */}
            <Switch>
               {/* Take user to current workout if it is live here */}
               <Route exact path="/">
                  {authCheck.authenticated ? (
                     // <Redirect to="/workout" />
                     <Home />
                  ) : (
                     <div>demo</div>
                  )}
               </Route>
               {/* This is the real home route */}
               <Route path="/home">
                  {authCheck.authenticated ? (
                        // <Redirect to="/workout" />
                        <Home />
                     ) : (
                        <div>demo</div>
                     )}
               </Route>
               <Route path="/signIn">
                  {authCheck.authenticated ? (
                     <Redirect to="/" />
                  ) : (
                     <SignIn />
                  )}
               </Route>
               <Route path="/signUp">
                  {authCheck.authenticated ? (
                     <Redirect to="/" />
                  ) : (
                     <SignUp />
                  )}
               </Route>
               <PrivateRoute path="/workout" component={Workout} />
               <PrivateRoute path="/history" component={History} />
               <PrivateRoute path="/data" component={Data} />
               <PrivateRoute path="/user" component={() =>
                  <div>
                     {authCheck.authenticated && authCheck.user.email}
                     <button onClick={() => auth.signOut()}>Sign Out</button>
                  </div>
               } />
            </Switch>
         </Router>
      </ThemeProvider>
   );
}



export default App;
