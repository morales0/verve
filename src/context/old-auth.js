import { createContext, useContext, useEffect, useState } from "react";
import "firebase/auth";
import { useAuth, useDatabase, useUser } from "reactfire";

const AuthContext = createContext();
const AuthProvider = (props) => {
  const auth = useAuth();
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const db = useDatabase();
  const usersRef = db.ref("users");
  const [userData, setUserData] = useState(null);

  // Subscribe to any auth changes
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("Auth change!");
      if (user) {
        console.log("User is logged in", user);

        // Make sure this user is in the database
        const userRef = db.ref(`users/${user.uid}`);
        userRef.get().then((snapshot) => {
          if (!snapshot.exists()) {
            console.log("No user data, need to add");
            // Create user document in database
            userRef
              .set({ uid: user.uid, email: user.email })
              .then(() => userRef.once("value"))
              .then((newUserSnapshot) => setUserData(newUserSnapshot.val()));
          } else {
            setUserData(snapshot.val());
          }
        });
      } else {
        console.log("User is not logged in");
      }

      setUser(user);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("Full re-render");
  });

  // Wait for authentication to load app
  if (authLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <AuthContext.Provider
        value={{
          user: userData,
          authenticated: user !== null,
          authLoading,
          userAuth: user,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }
};

const useAuthCheck = () => {
  const authCheck = useContext(AuthContext);
  return authCheck;
};

export { AuthProvider, useAuthCheck };
