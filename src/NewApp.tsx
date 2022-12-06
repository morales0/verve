/**
 * TODO:
 * - Integrate lazy load for performance
 */

import AuthApp from "./AuthApp";
import React, { useState } from "react";
import { useSigninCheck, useUser } from "reactfire";
import { ThemeProvider } from "styled-components";
import themes from "./styles/themes";
import UnauthApp from "./UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const NewApp = () => {
  const { status: authStatus, data: authData } = useSigninCheck();
  const user = useUser();
  const [theme, setTheme] = useState("dark");

  return <div>New App!</div>;

  /*

   // Wait for auth status
   if (authStatus === 'loading') {
      return (
         null
      )
   }

   // Return auth app once data loads
   if (authData.signedIn) {
      if (user.data) {
         return (
            <ThemeProvider theme={themes[theme]}>
               <AuthApp setTheme={setTheme} />
            </ThemeProvider>
         )
      }
   // Return the unauth app
   } else {
      return (
         <ThemeProvider theme={themes[theme]}>
            <UnauthApp />
         </ThemeProvider>
      )
   }

   // Catch all
   return null

   */
};

export default NewApp;
