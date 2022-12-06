import { useAuthCheck } from "context/auth";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authCheck = useAuthCheck();

  if (authCheck.authLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authCheck.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
