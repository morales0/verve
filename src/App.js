import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth, useDatabase, useDatabaseObjectData, useUser } from 'reactfire';
import { useMediaQuery } from 'react-responsive';
import { About, Builder, Calculator, Data, Demo, History, Home, SignIn, SignUp, Workout } from 'pages';
import { useAuthCheck } from './context/auth';
import { GuestNavbar, UserNavbar, PrivateRoute } from './components';
import styled, { ThemeProvider } from 'styled-components';
import ogExercises from 'data/original-exercises';



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

const AppWrapper = styled.div`
   display: flex;
   flex-direction: ${props => props.vertical || props.theme.isMobile ? 'column' : 'row'};

   height: 100%;

   & > div:first-of-type {
      flex-grow: 1; /* Fill up space */
      overflow-y: hidden; /* Don't grow off screen, components decide scroll */
   }

`

function App() {
   const authCheck = useAuthCheck()
   const auth = useAuth()
   // On mobile, app will have a different layout
   // Desktop will have a responsive side navbar
   // Mobile will have a responsive top navbar
   const isMobile = useMediaQuery({query: '(max-width: 748px)'});
   const db = useDatabase()


   useEffect(() => {
      console.log("App", authCheck.user)
   });

   const createOG = () => {
      console.log('hello')
      const ogRef = db.ref('original-exercises')
   
      ogRef.set(ogExercises)
   }

   return (
      <ThemeProvider theme={{...draft_theme, isMobile: isMobile}}>
         {/* <AppWrapper vertical={!authCheck.authenticated || isMobile}> */}
         <AppWrapper vertical={!authCheck.authenticated}>
            <Router>
               {/* Render appropriate navbar */}
               {authCheck.authenticated ? (
                  <UserNavbar isMobile={isMobile} />
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
                        <Demo />
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
                  <PrivateRoute path="/builder" component={Builder} />
                  <PrivateRoute path="/calculator" component={Calculator} />
                  <PrivateRoute path="/about" component={About} />
                  <PrivateRoute path="/user" component={() =>
                     <div>
                        {authCheck.authenticated && authCheck.user?.email}
                        <button onClick={() => auth.signOut()}>Sign Out</button>
                     </div>
                  } />
                  <Route path='/dev/og'>
                     <button onClick={createOG}>CREATE OG</button>
                  </Route>
               </Switch>
            </Router>
         </AppWrapper>
      </ThemeProvider>
   );
}

export default App;