import { useAuth, UserProvider } from "@/context/";
import { resolver, theme } from "@/styles";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { lazy, Suspense } from "react";

const UserApp = lazy(() => import("./user-app"));
const UnauthApp = lazy(() => import("./UnauthApp"));

const App = () => {
  const { authUser, status } = useAuth();

  const userIsAuthenticated = status === "authenticated" && authUser;

  /*
  TODO: enable theme modification

  ? the theme doesn't update immediately, there needs to be a reload
  const { db } = useDatabase();

  const [userTheme, setUserTheme] = useState<MantineThemeOverride>(theme);

  Merge user theme with default theme
  useEffect(() => {
    if (!user) return;

    const dataRef = ref(db, `users/${user.uid}`);
    const themeRef = child(dataRef, "theme");

    onValue(themeRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("Merging theme");
        const val = snapshot.val();
        const newTheme = createTheme(val);
        const mergedTheme = mergeThemeOverrides(theme, newTheme);
        setUserTheme(mergedTheme);
      }
    });
  }, [user]); */

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" cssVariablesResolver={resolver}>
      {userIsAuthenticated ? (
        <UserProvider user={authUser}>
          <Suspense fallback={<LoadingOverlay />}>
            <UserApp />
          </Suspense>
        </UserProvider>
      ) : status === "unauthenticated" ? (
        <Suspense fallback={<LoadingOverlay />}>
          <UnauthApp />
        </Suspense>
      ) : status === "loading" ? (
        <LoadingOverlay />
      ) : (
        <div>Error: {status}. Try again.</div>
      )}
    </MantineProvider>
  );
};

export default App;
