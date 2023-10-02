/**
 * TODO:
 * Integrate lazy load for performance
 */

import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { useAuth } from "../context/auth";
import UserProvider from "../context/user";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { user, status: authStatus } = useAuth();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          globalStyles: (theme) => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
            },

            body: {
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[0],
            },
          }),
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        {authStatus === "authenticated" && user ? (
          <UserProvider user={user}>
            <AuthApp />
          </UserProvider>
        ) : authStatus === "unauthenticated" ? (
          <UnauthApp />
        ) : authStatus === "loading" ? null : (
          <div>Error: {authStatus}. Try again.</div>
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
