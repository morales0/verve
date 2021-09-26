import { onAuthStateChanged, updateProfile } from "@firebase/auth";
import { UserNavbar } from "components";
import { Home, User, Workout } from "pages";
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
                  <Workout />
               </Route>
               <Route path="/history">
                  <div style={{padding: ".6rem"}}>History coming soon!</div>
               </Route>
               <Route path="/data">
                  <div style={{padding: ".6rem"}}>Data coming soon!</div>
               </Route>
               <Route path="/builder">
                  <div style={{padding: ".6rem"}}>Builder coming soon!</div>
               </Route>
               <Route path="/calculator">
                  <div style={{padding: ".6rem"}}>Calculator coming soon!</div>
               </Route>
               <Route path="/about">
                  <div style={{padding: ".6rem"}}>About coming soon!</div>
               </Route>
               <Route path="/user">
                  <User setCurrTheme={props.setCurrTheme}/>
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