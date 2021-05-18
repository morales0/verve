import { useSignInCheck } from 'reactfire'

// Will provide the authentication data
const AuthWrapper = (props) => {
   const {status, data: authResult } = useSignInCheck()

   if (status === 'loading') {
      return <p>Signing in...</p>
   } else if (authResult.signedIn) {
      return props.children
   }

   // Redirect to sign in page
   return (
      <p>No account</p>
   )
}

export default AuthWrapper