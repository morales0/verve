export default PrivateRoute = ({ component: Component, ...rest }) => {
   const authCheck = useAuthCheck()

   if (authCheck.authLoading) {
      return null
   }

   return (
      <Route {...rest}
         render={props => 
            authCheck.authenticated ? (
               <Component {...props} />
            ) : (
               <Redirect to={{
                  pathname: "/signIn",
                  state: { from: props.location }
               }}/>
            )
         }
      />
   )
}