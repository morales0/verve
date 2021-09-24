import AuthApp from "AuthApp";
import React, { useEffect, useState } from "react";
import { useDatabase, useSigninCheck, useUser } from "reactfire";
import { useMediaQuery } from "react-responsive"
import styled, { ThemeProvider } from "styled-components";
import UnauthApp from "UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

// TODO: Create theme and global styles
// This will be to test out themes and colors site wide
const darkModeDRAFT = {
   name: 'dark',
   fg: '#fff', // Used for foreground white text
   bg: '#404040', // Used for background black
   gray: '#adadad',
}

const lightModeDRAFT = {
   name: 'main',
   fg: '#333',
   bg: '#fefefe',
   gray: '#adadad',
}

const NewApp = (props) => {
   const { status: authStatus, data: authData } = useSigninCheck()
   const isMobile = useMediaQuery({query: '(max-width: 748px)'});
   const [currTheme, setCurrTheme] = useState(lightModeDRAFT);

   // Wait to see if a user is signed in
   if (authStatus === 'loading') {
      return (
         <div>Loading screen...</div>
      )
   }

   // Return the app!
   return (
      <ThemeProvider theme={currTheme}>
         {authData.signedIn ? <AuthApp isMobile={isMobile}/> : <UnauthApp isMobile={isMobile}/>}
      </ThemeProvider>
   );
}
 
export default NewApp;