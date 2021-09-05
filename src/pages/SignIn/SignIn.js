import { AuthForm, AuthPage, EmailInput, PasswordInput } from 'components/ui';
import 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'reactfire';

const SignIn = (props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const auth = useAuth()
   const history = useHistory()

   // Functions
   const signIn = () => {
      signInWithEmailAndPassword(auth, email, password).then((user) => {
         history.push("/")
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
            <AuthForm headerName="Sign In" submitName="Submit" onSubmit={signIn}>
               <EmailInput
                  id="signinEmailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <PasswordInput
                  id="siginPasswordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </AuthForm>
         </div>
      </AuthPage>
   );
}

export default SignIn;