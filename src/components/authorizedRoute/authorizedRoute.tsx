import React, {FC} from 'react';
import {View} from 'react-native';
import {Route, Redirect, useLocation} from 'react-router-native';
import routes from '../../routes';
import {useAccountValues} from '../../utils/services/authz/account/AccountContextProvider';
interface types {
  path?: any;
  exact?: any;
  Component?: any;
}
const AuthorizedRoute: FC<types> = (props: types) => {
  const {path, Component} = props;
  const {authenticated} = useAccountValues();

  return (
    <Route
      path={path}
      exact={true}
      render={() => {
        if (!authenticated) {
          return <Redirect to={`${routes.login}`} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
export default AuthorizedRoute;
