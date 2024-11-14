import { resolver, theme } from "@/styles";
import { MantineProvider } from "@mantine/core";
import { useAuth } from "../context/auth";
import UserProvider from "../context/user";
import UnauthApp from "./UnauthApp";
import UserApp from "./user-app";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { user, status: authStatus } = useAuth();

  return (
    <MantineProvider defaultColorScheme="auto" theme={theme} cssVariablesResolver={resolver}>
      {authStatus === "authenticated" && user ? (
        <UserProvider user={user}>
          <UserApp />
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
