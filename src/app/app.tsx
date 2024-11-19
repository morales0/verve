import { useDatabase } from "@/context/database";
import { theme } from "@/styles";
import { createTheme, LoadingOverlay, MantineProvider, MantineThemeOverride, mergeThemeOverrides } from "@mantine/core";
import { child, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import UserProvider from "../context/user";
import UnauthApp from "./UnauthApp";
import UserApp from "./user-app";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { user, status } = useAuth();
  const { db } = useDatabase();
  const [userTheme, setUserTheme] = useState<MantineThemeOverride>(theme);

  // Merge user theme with default theme
  useEffect(() => {
    if (!user) return;

    const dataRef = ref(db, `users/${user.uid}`);
    const themeRef = child(dataRef, "theme");

    onValue(themeRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const newTheme = createTheme(val);
        const mergedTheme = mergeThemeOverrides(theme, newTheme);
        setUserTheme(mergedTheme);
      }
    });
  }, [user]);

  return (
    <MantineProvider theme={userTheme} defaultColorScheme="auto">
      {status === "authenticated" && user ? (
        <UserProvider user={user}>
          <UserApp />
        </UserProvider>
      ) : status === "unauthenticated" ? (
        <UnauthApp />
      ) : status === "loading" ? (
        <LoadingOverlay />
      ) : (
        <div>Error: {status}. Try again.</div>
      )}
    </MantineProvider>
  );
};

export default App;
