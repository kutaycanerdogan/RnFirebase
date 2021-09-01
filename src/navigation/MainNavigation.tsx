import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import useAsyncStorage from '../utils/hooks/useAsyncStorage';
import {useAccountValues} from '../utils/services/authz/account/AccountContextProvider';
import {Text, View} from 'react-native';

const MainNavigation: FC = () => {
  const storage = useAsyncStorage();
  const {authenticated} = useAccountValues();
  // const [initializing, setInitializing] = useState<boolean>(true);
  // const [user, setUser] = useState<any>();

  return (
    <NavigationContainer>
      {/* <View>
        <Text>MainNavigation</Text>
      </View> */}
      {authenticated ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
