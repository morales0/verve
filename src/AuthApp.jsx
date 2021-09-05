import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth } from "reactfire"
import styled from "styled-components"

const AuthAppWrapper = styled.div`

`

const AuthApp = (props) => {
   const auth = useAuth()

   console.log(auth)

   return (
      <AuthAppWrapper>
         <Router>
            {/* User navbar */}
            {/* <UserNavbar /> */}
            Authenticated App
            <button onClick={() => auth.signOut()}>
               Sign Out
            </button>
         </Router>
      </AuthAppWrapper>
   )
}

export default AuthApp