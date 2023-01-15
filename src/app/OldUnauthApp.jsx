import { GuestNavbar } from "components";
import { SignIn, SignUp } from "pages";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";

const UnauthAppWrapper = styled.div``;

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
          <Route path="*">
            <Redirect to="/signin" />
          </Route>
        </Switch>
      </Router>
    </UnauthAppWrapper>
  );
};

export default UnauthApp;
