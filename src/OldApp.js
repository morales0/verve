import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { useMediaQuery } from "react-responsive";
import { useAuthCheck } from "./context/auth";

import {
  useAuth,
  useDatabase,
  useDatabaseObjectData,
  useUser,
} from "reactfire";

// Pages & Components
import {
  About,
  Builder,
  Calculator,
  Data,
  Demo,
  History,
  Home,
  SignIn,
  SignUp,
  Workout,
} from "pages";
import { GuestNavbar, UserNavbar, PrivateRoute } from "./components";

// This will be to test out themes and colors site wide
const draft_theme = {
  main: {
    theme: "main",
    fg: "#333",
    bg: "#fefefe",
  },
  dark: {
    theme: "dark",
    fg: "#fff",
    bg: "#404040",
  },
};

// Dynamic styling for App
const AppWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.vertical || props.theme.isMobile ? "column" : "row"};

  height: 100%;

  & > div:first-of-type {
    flex-grow: 1; /* Fill up space */
    overflow-y: hidden; /* Don't grow off screen, components decide scroll */
  }
`;

function App() {
  const authCheck = useAuthCheck();
  const auth = useAuth();
  // On mobile, app will have a different layout
  // Desktop will have a responsive side navbar
  // Mobile will have a responsive top navbar
  const isMobile = useMediaQuery({ query: "(max-width: 748px)" });

  return (
    <ThemeProvider theme={{ ...draft_theme, isMobile: isMobile }}>
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
              {authCheck.authenticated ? <Redirect to="/" /> : <SignIn />}
            </Route>
            <Route path="/signUp">
              {authCheck.authenticated ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <PrivateRoute path="/workout" component={Workout} />
            <PrivateRoute path="/history" component={History} />
            <PrivateRoute path="/data" component={Data} />
            <PrivateRoute path="/builder" component={Builder} />
            <PrivateRoute path="/calculator" component={Calculator} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute
              path="/user"
              component={() => (
                <div>
                  {authCheck.authenticated && authCheck.user?.email}
                  <button onClick={() => auth.signOut()}>Sign Out</button>
                </div>
              )}
            />
          </Switch>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
