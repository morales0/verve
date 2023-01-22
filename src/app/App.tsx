/**
 * TODO:
 * Integrate lazy load for performance
 */

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { useAuth } from "../context/auth";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { status: authStatus } = useAuth();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {authStatus === "authenticated" ? (
          <AuthApp />
        ) : authStatus === "unauthenticated" ? (
          <UnauthApp />
        ) : authStatus === "loading" ? (
          <div>Loading</div>
        ) : (
          <div>Error: {authStatus}. Try again.</div>
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
