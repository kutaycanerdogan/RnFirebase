import React, {useState, useEffect, FC} from 'react';
import useAsyncStorage from '../../utils/hooks/useAsyncStorage';
import {useAccountValues} from '../../utils/services/authz/account/AccountContextProvider';
import {useAccountApi} from '../../utils/services/authz/account/Account';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from '../../components/button/Button';
import CustomInput from '../../components/input/Input';
import {useHistory, Redirect} from 'react-router-native';
import routes from '../../routes';
import CustomDrawer from '../../components/drawer/CustomDrawer';

interface UserCredentials {
  userName: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const history = useHistory();
  const storage = useAsyncStorage();
  const {authenticated, authUser, isFetching} = useAccountValues();
  const {createTokenAsync} = useAccountApi();
  const [userCredentials, setuserCredentials] = useState<UserCredentials>({
    userName: 'kutaycan01@gmail.com',
    password: '123456',
  });
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const handleuserCredentials = (val: UserCredentials) => {
    setuserCredentials(val);
  };
  const handleLogin = async (): Promise<void> => {
    await createTokenAsync(userCredentials.userName, userCredentials.password);
  };
  useEffect(() => {
    authenticated && history.push(routes.dashboard.root);
  }, [authenticated]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.imageContainer}>
        <Image
          key="login-background"
          source={require('../../assets/img/menu-photo.jpg')}
          style={styles.image}
        />
      </View>
      <View key="login-view4" style={styles.fadingContainer}>
        <CustomInput
          key="login-CustomInput"
          onSubmitEditing={e => {
            handleuserCredentials({
              ...userCredentials,
              userName: e.nativeEvent.text,
            });
          }}
          placeholder={'Kullanıcı Adı'}
          iconName="user"
          borderColor="black"
          focusedBorderColor="black"
        />
        <CustomInput
          key="login-CustomInput2"
          onEndEditing={e => {
            handleuserCredentials({
              ...userCredentials,
              password: e.nativeEvent.text,
            });
          }}
          placeholder={'Şifre'}
          iconName={!showPassword ? 'lock' : 'unlock'}
          borderColor="black"
          focusedBorderColor="black"
          secureTextEntry={!showPassword}
          onIconPress={() => {
            !showPassword ? setshowPassword(true) : setshowPassword(false);
          }}
        />
      </View>
      <Button
        buttonStyle={styles.button}
        loading={isFetching}
        disabled={isFetching}
        text={'Giriş Yap'}
        onPress={handleLogin}
      />
      <View style={styles.button2Container}>
        <Text>Hesabın Yok Mu?</Text>
        <Button
          buttonStyle={styles.button2}
          disabled={isFetching}
          text={'Üye Ol'}
          onPress={() => history.push(routes.signUp)}
        />
      </View>
      {!!authUser && (
        <Redirect
          to={{
            pathname: routes.dashboard.root,
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    fontWeight: '700',
    color: 'black',
    borderColor: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    height: undefined,
  },
  button: {
    height: 45,
    width: '80%',
  },
  button2Container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button2: {
    flexGrow: 0.5,
    marginTop: 0,
    marginLeft: 20,
  },
  fadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  spinnerContainer: {
    height: '100%',
    width: '100%',
  },
  languageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
export default LoginScreen;
