import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth, useDatabase, useDatabaseObjectData, useUser } from 'reactfire';
import 'firebase/database';
import { Home, SignIn, SignUp, Workout } from './pages';
import AuthWrapper, { useAuthCheck } from './context/auth';
import { GuestNavbar, UserNavbar } from './components';

/* 
Providers:
Firebase: Auth, User, and Database
Theme Provider
*/
const routes = ["/signIn", "/signUp", "./workouts", "/history", "/user"]

function App() {
   const authCheck = useAuthCheck()
   const auth = useAuth()
   /* const db = useDatabase()
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
   } */

   return (
      <Router>

         {/* Render appropriate navbar */}
         {authCheck.authenticated ? (
            <UserNavbar user={'user'}/>
         ) : (
            <GuestNavbar />
         )}
         
         {/* Render the page component (depending on auth status) */}
         <Switch>
            <Route exact path="/">
               {authCheck.authenticated ? (
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

            <PrivateRoute path="/history">
               <div>History</div>
            </PrivateRoute>

            <PrivateRoute path="/user" component={() =>
               <div>
                  {authCheck.authenticated && authCheck.user.email}
                  <button onClick={() => auth.signOut()}>Sign Out</button>
               </div>
            } />
         </Switch>

      </Router>
   );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
   const authCheck = useAuthCheck()

   if (authCheck.authLoading) {
      return null
   }

   return (
      <Route {...rest}
         render={props => 
            authCheck.authenticated ? (
               <Component {...props} />
            ) : (
               <Redirect to={{
                  pathname: "/signIn",
                  state: { from: props.location }
                }}/>
            )
         }
      />
   )

}

export default App;
