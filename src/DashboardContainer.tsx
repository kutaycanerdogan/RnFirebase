import React, {Suspense, useEffect} from 'react';
import {FC} from 'react';
import {
  Redirect,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-native';
import routes from './routes';
import Dashboard from './screens/dashboard/DashboardScreen';
import {useAccountValues} from './utils/services/authz/account/AccountContextProvider';
import CustomDrawer from './components/drawer/CustomDrawer';
import AuthorizedRoute from './components/authorizedRoute/authorizedRoute';
import MenuList from './screens/menu/MenuListScreen';
import MenuContextProvider from './utils/services/menu/MenuContextProvider';
const DashboardContainer: FC = () => {
  const {authenticated} = useAccountValues();
  const {pathname} = useLocation();

  return (
    <>
      {!!authenticated ? (
        <>
          <CustomDrawer>
            {pathname === routes.dashboard.root && <Dashboard />}
            <Suspense fallback={<></>}>
              <Switch>
                <MenuContextProvider>
                  <AuthorizedRoute
                    exact
                    path={routes.dashboard.menu}
                    Component={MenuList}
                  />
                </MenuContextProvider>
                <AuthorizedRoute
                  exact
                  path={routes.dashboard.root}
                  Component={Dashboard}
                />
              </Switch>
            </Suspense>
          </CustomDrawer>
        </>
      ) : (
        <Redirect
          to={{
            pathname: routes.login,
          }}
        />
      )}
    </>
  );
};

export default DashboardContainer;
