import { UserNavbar } from "components";
import { TestCanvas } from "components/util";
import { Home, UserPage, Workout } from "pages";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useAuth, useUser } from "reactfire";
import styled from "styled-components";

// Dynamic styling for Auth app
const AuthAppWrapper = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;

   & > div:nth-child(2) {
      flex-grow: 1; /* Fill up space */
      overflow-y: hidden; /* Don't grow off screen, components decide scroll */
   }
`

const AuthApp = (props) => {
   const auth = useAuth()
   const user = useUser()
   const isMobile = useMediaQuery({ query: '(max-width: 748px)' });

   // Check if there is user data before rendering
   if (!user.data) {
      return (
         <div>Loading user...</div>
      )
   }

   return (
      <AuthAppWrapper isMobile={isMobile}>
         <Router>
            {/* User navbar */}
            <UserNavbar isMobile={isMobile} setTheme={ props.setTheme }/>

            {/* Render the requested page */}
            <Switch>
               {/* DEV */}
               <Route path="/test">
                  <TestCanvas />
               </Route>

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
                  <UserPage setCurrTheme={props.setTheme}/>
               </Route>
               <Route exact path="/">
                  <Home />
               </Route>

               {/* Not found page -> redirect home */}
               <Route>
                  <Redirect to="/" />
               </Route>
            </Switch>
         </Router>
      </AuthAppWrapper>
   )
}

export default AuthApp