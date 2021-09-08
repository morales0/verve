import { onAuthStateChanged, updateProfile } from "@firebase/auth";
import { UserNavbar } from "components";
import { Home } from "pages";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useAuth, useUser } from "reactfire"
import styled from "styled-components"

const AuthAppWrapper = styled.div`
   display: flex;
   flex-direction: ${props => props.isMobile ? 'column' : 'row'};

   height: 100%;

   & > div:first-of-type {
      flex-grow: 1; /* Fill up space */
      overflow-y: hidden; /* Don't grow off screen, components decide scroll */
   }
`

const AuthApp = (props) => {
   const auth = useAuth()
   const user = useUser()

   useEffect(() => {
      console.log("AuthApp", user)
   }, [JSON.stringify(user)]);

   // Check is there is user data before rendering
   if (!user.data) {
      return (
         <div>
            Loading user...
         </div>
      )
   }

   return (
      <AuthAppWrapper isMobile={props.isMobile}>
         <Router>
            {/* User navbar */}
            <UserNavbar isMobile={props.isMobile}/>

            {/* Render the requested page */}
            <Switch>
               <Route path="/workout">
                  <div>Workout</div>
               </Route>
               <Route path="/history">
                  <div>History</div>
               </Route>
               <Route path="/data">
                  <div>Data</div>
               </Route>
               <Route path="/builder">
                  <div>Builder</div>
               </Route>
               <Route path="/calculator">
                  <div>Calculator</div>
               </Route>
               <Route path="/about">
                  <div>About</div>
               </Route>
               <Route path="/user">
                  <div>
                     <div>{user.data.displayName}</div>
                     <button onClick={() => auth.signOut()}>
                        Sign Out
                     </button>
                  </div>
               </Route>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route>
                  <Redirect to="/" />
               </Route>
            </Switch>
         </Router>
      </AuthAppWrapper>
   )
}

export default AuthApp