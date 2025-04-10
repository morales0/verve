import { resolver, theme } from "@/styles";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { useAuth, UserProvider } from "@/context/";
import UnauthApp from "./UnauthApp";
import UserApp from "./user-app";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const App = () => {
  const { authUser, status } = useAuth();
  // const { db } = useDatabase();

  // const [userTheme, setUserTheme] = useState<MantineThemeOverride>(theme);

  // Merge user theme with default theme
  // useEffect(() => {
  //   if (!user) return;

  //   const dataRef = ref(db, `users/${user.uid}`);
  //   const themeRef = child(dataRef, "theme");

  //   onValue(themeRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log("Merging theme");
  //       const val = snapshot.val();
  //       const newTheme = createTheme(val);
  //       const mergedTheme = mergeThemeOverrides(theme, newTheme);
  //       setUserTheme(mergedTheme);
  //     }
  //   });
  // }, [user]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" cssVariablesResolver={resolver}>
      {status === "authenticated" && authUser ? (
        <UserProvider user={authUser}>
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
