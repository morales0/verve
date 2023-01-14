/**
 * TODO:
 * - Integrate lazy load for performance
 */

// import AuthApp from "./AuthApp";
import { useState } from "react";
// import UnauthApp from "./UnauthApp";
import { MantineProvider } from "@mantine/core";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const [authStatus, setAuthStatus] = useState("unauthenticated")

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      {
        authStatus === "authenticated" ? (
          <AuthApp />
        ) : authStatus === "unauthenticated" ? (
          <UnauthApp login={() => setAuthStatus("authenticated")} />
        ) : authStatus === "loading" ? (
          <div>Loading</div>
        ) : (
          <div>Error: {authStatus}. Try again.</div>
        )
      }
    </MantineProvider>
  )
};

export default App;
