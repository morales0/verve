import 'firebase/auth'
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth, useDatabase } from 'reactfire';
import styled from 'styled-components/macro'
import { AuthForm } from '../../components';

const SignUp = (props) => {
   const [name, setName] = useState('')
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState();
   const auth = useAuth()
   const db = useDatabase()
   const history = useHistory()
   const location = useLocation()

   // Functions
   const createUser = (uid, email, name, username) => {
      db.ref('users/' + uid).set({
         uid: uid,
         email: email,
         name: name,
         username: username
      });
   }

   const signUp = () => {
      auth.createUserWithEmailAndPassword(email, password).then((user) => {
         // If a user was redirected, send back to that page (stopped working)
         /* if (location.state.from) {
            history.push(location.state.from.pathname)
         } else {
            history.push("/workout")
         } */
         createUser(user.user.uid, user.email, name, username)
         
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
               <input placeholder="Full Name" type="text" value={name}
                  onChange={(e) => setName(e.target.value)} />
               <input placeholder="Username" type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)} />
               <input placeholder="Email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
               <input placeholder="Password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
               <button onClick={signUp}>Sign Up</button>
               <button onClick={() => history.push("/signIn")}>Sign In</button>
            </AuthForm>
         </div>
      </div>
   );
}

export default SignUp;