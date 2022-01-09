/**
 * TODO:
 * - Consider theme setter context maybe?
 * - Integrate lazy load for performance
 */

import AuthApp from "AuthApp";
import React, { useState } from "react";
import { useSigninCheck } from "reactfire";
import { ThemeProvider } from "styled-components";
import themes from "styles/themes";
import UnauthApp from "UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const NewApp = () => {
   // Useful App global state
   const { status: authStatus, data: authData } = useSigninCheck()
   const [theme, setTheme] = useState("dark");

   // Wait to see if a user is signed in
   if (authStatus === 'loading') {
      return (
         <div>Loading...</div>
      )
   }

   // Return the app!
   return (
      <ThemeProvider theme={themes[theme]}>
         {
            authData.signedIn ?
               <AuthApp setTheme={setTheme} />
            :
               <UnauthApp />
         }
      </ThemeProvider>
   );
}

export default NewApp;