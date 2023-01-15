/**
 * TODO:
 * - Integrate lazy load for performance
 */

// import AuthApp from "./AuthApp";
import { useState } from "react";
// import UnauthApp from "./UnauthApp";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const [authStatus, setAuthStatus] = useState("authenticated")
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
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
    </ColorSchemeProvider>
  )
};

export default App;
