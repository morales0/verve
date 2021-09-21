import { AuthForm, AuthPage, EmailInput, PasswordInput } from 'components/ui';
import 'firebase/auth'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth, useDatabase } from 'reactfire';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { TextInput } from './styled-components';
import { ref, set } from '@firebase/database';

const SignUp = (props) => {
   const [name, setName] = useState('')
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const auth = useAuth()
   const db = useDatabase()
   const history = useHistory()

   // Functions
   const createUser = (uid, email, name, username) => {
      const userDataRef = ref(db, 'users/' + uid)
      
      set(userDataRef, {
         uid: uid,
         email: email,
         name: name,
         username: username
      });
   }

   const signUp = () => {
      createUserWithEmailAndPassword(auth, email, password).then((user) => {
         createUser(user.user.uid, user.user.email, name, username)
         updateProfile(user.user, {
            displayName: username
         }).then(() => {
         })
      })
         .catch((err) => {
            setEmail('')
            setPassword('')
            setError(err)
         })
   }

   return (
      <AuthPage>
         <div className="form_wrapper">
            {error && <div> {error.message} </div>}
            <AuthForm headerName="Sign Up" submitName="Submit" onSubmit={signUp}>
               <TextInput label="Full Name" placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <TextInput label="Username" placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <EmailInput 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <PasswordInput 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </AuthForm>
         </div>
      </AuthPage>
   );
}

export default SignUp;