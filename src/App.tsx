import React, {Suspense, useEffect} from 'react';
import LoginScreen from './screens/login/LoginScreen';
import AccountContextProvider from './utils/services/authz/account/AccountContextProvider';
import {NativeBaseProvider} from 'native-base';
import {Route, Switch, NativeRouter} from 'react-router-native';
import routes from './routes';
import DashboardContainer from './DashboardContainer';
import SignUpScreen from './screens/login/SignUpScreen';
import Hello from './screens/Hello';
const App = () => {
  return (
    <NativeBaseProvider>
      <AccountContextProvider>
        <NativeRouter>
          <Switch>
            <Suspense fallback={<></>}>
              <Route
                path={routes.dashboard.root}
                component={DashboardContainer}
              />
              <Route
                exact
                path={routes.landingScreen}
                component={LoginScreen}
              />
              <Route exact path={routes.login} component={LoginScreen} />
              <Route exact path={routes.signUp} component={SignUpScreen} />
              <Route exact path={routes.hello} component={Hello} />
            </Suspense>
          </Switch>
        </NativeRouter>
      </AccountContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
