import { UserNavbar } from "components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth } from "reactfire"
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
               <Route exact path="/">
                  <div>
                     <div>User Home</div>
                     <button onClick={() => auth.signOut()}>
                        Sign Out
                     </button>
                  </div>
               </Route>
            </Switch>
         </Router>
      </AuthAppWrapper>
   )
}

export default AuthApp