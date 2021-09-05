import AuthApp from "AuthApp";
import React, { useEffect } from "react";
import { useDatabase, useSigninCheck, useUser } from "reactfire";
import { useMediaQuery } from "react-responsive"
import styled, { ThemeProvider } from "styled-components";
import UnauthApp from "UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

// TODO: Create theme and global styles

const NewApp = (props) => {
   const { status: authStatus, data: authData } = useSigninCheck()
   const user = useUser()
   const isMobile = useMediaQuery({query: '(max-width: 748px)'});

   // If user has not loaded, display loading screen
   if (authStatus === 'loading' || (authData.signedIn && !user.data)) {
      return (
         <div>Loading screen...</div>
      )
   }

   // Return the app!
   return (
      <ThemeProvider theme={{}}>
         {authData.signedIn ? <AuthApp isMobile={isMobile}/> : <UnauthApp isMobile={isMobile}/>}
      </ThemeProvider>
   );
}
 
export default NewApp;