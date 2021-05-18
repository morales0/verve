import 'firebase/auth'
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'reactfire';
import styled from 'styled-components/macro'
import { AuthForm } from '../../components';

const SignIn = (props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState();
   const auth = useAuth()
   const history = useHistory()
   const location = useLocation()

   // Functions
   const signIn = () => {
      auth.signInWithEmailAndPassword(email, password).then((user) => {
         // If a user was redirected, send back to that page (stopped working)
         /* console.log(location.state)
         if (location.state.from) {
            history.push(location.state.from.pathname)
         } else {
            history.push("/workout")
         } */
      })
      .catch((err) => {
         console.log("Error", err)
         setEmail('')
         setPassword('')
         setError(err)
      })
   }

   return (
      <div css={`
         display: grid;
         place-items: center;
         height: 100%;
      `}>
         <div>
            {error && <div> {error.message} </div>}
            <AuthForm>
               <input placeholder="Email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
               <input placeholder="Password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
               <button onClick={signIn}>Sign In</button>
               <button onClick={() => history.push("/signUp")}>Sign Up</button>
            </AuthForm>
         </div>
      </div>
   );
}

const ButtonLink = styled(Link)`
   text-decoration: none;
   color: inherit;
`

export default SignIn;