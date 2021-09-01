import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import Hello from '../screens/Hello';
const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {/* <Screen name="Hello" component={Hello} /> */}
      <Screen name="Login" component={LoginScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  );
};

export default AppStack;
