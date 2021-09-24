import { GuestNavbar } from "components"
import { SignIn, SignUp } from "pages";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import styled from "styled-components";

const UnauthAppWrapper = styled.div`

`

const UnauthApp = (props) => {
   return (
      <UnauthAppWrapper>
         <Router>
            {/* Guest navbar */}
            <GuestNavbar />

            {/* Guest Routes */}
            <Switch>
               <Route path="/signin">
                  <SignIn />
               </Route>
               <Route path="/signup">
                  <SignUp />
               </Route>
               <Route exact path="/">
                  {/* <div>Guest home</div> */}
                  <Redirect to="/signin" />
               </Route>
               <Route>
                  <Redirect to="/" />
               </Route>
            </Switch>
         </Router>
      </UnauthAppWrapper>
   )
}

export default UnauthApp