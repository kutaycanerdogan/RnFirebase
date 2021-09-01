import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import CustomDrawer from '../../components/drawer/CustomDrawer';
import useAsyncStorage from '../../utils/hooks/useAsyncStorage';
import {useAccountValues} from '../../utils/services/authz/account/AccountContextProvider';

const DashboardScreen: React.FC = () => {
  const storage = useAsyncStorage();
  const {authUser} = useAccountValues();

  return (
    <View style={styles.dashboard}>
      <Text style={styles.text}>{authUser.displayName}</Text>
      <Text style={styles.text}>TıklaGelsin'e Hoş Geldiniz!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {fontSize: 25},
});
export default DashboardScreen;
