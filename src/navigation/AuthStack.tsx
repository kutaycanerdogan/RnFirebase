import React, {FC} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import MenuListScreen from '../screens/menu/MenuListScreen';
import MenuContextProvider from '../utils/services/menu/MenuContextProvider';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import CustomDrawer from '../components/drawer/CustomDrawer';
const {Navigator, Screen} = createStackNavigator();

const AuthStack: FC = () => {
  return (
    <MenuContextProvider>
      <Navigator
        screenOptions={{
          headerShown: true,
          header: header => {
            return (
              <View>
                {/* <CustomDrawer
                  navigation={header.navigation}
                  route={header.route}
                /> */}
                <Text style={styles.header}>{header.route.name}</Text>
              </View>
            );
          },
        }}>
        <Screen name="Dashboard" component={DashboardScreen} />
        <Screen name="Menu" component={MenuListScreen} />
      </Navigator>
    </MenuContextProvider>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 25,
  },
});
export default AuthStack;
