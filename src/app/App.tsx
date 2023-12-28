import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import { useAuth } from "../context/auth";
import UserProvider from "../context/user";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { user, status: authStatus } = useAuth();

  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
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
  );
};

export default App;
