/**
 * TODO:
 * Integrate lazy load for performance
 */

import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useAuth } from "../context/auth";
import UserProvider from "../context/user";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { user, status: authStatus } = useAuth();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          globalStyles: (theme) => ({
            "*": {
              boxSizing: "border-box",
            },

            body: {
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[0],
            },
          }),
          components: {
            ActionIcon: {
              styles: (theme, params) => ({
                root: { boxShadow: params.variant === "light" ? `0 0 1px 0` : undefined },
              }),
            },
            Button: {
              styles: (theme, params) => ({
                root: { boxShadow: params.variant === "light" ? `0 0 1px 0` : undefined },
              }),
            },
            Paper: {
              styles: (theme, params) => ({
                root: { borderColor: theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[2] },
              }),
            },
            Checkbox: {
              styles: (theme, params) => ({
                input: { borderColor: theme.colorScheme === "light" ? theme.colors.gray[2] : undefined },
              }),
            },
          },
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
