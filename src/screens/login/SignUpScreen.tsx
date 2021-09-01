import React, {useState, useEffect} from 'react';
import {useAccountValues} from '../../utils/services/authz/account/AccountContextProvider';
import {useAccountApi} from '../../utils/services/authz/account/Account';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../../components/button/Button';
import CustomInput from '../../components/input/Input';
import routes from '../../routes';
import {useHistory} from 'react-router-native';
interface UserCredentials {
  displayName: string;
  userName: string;
  password: string;
}

const SignUpScreen: React.FC = () => {
  const {authenticated, isFetching} = useAccountValues();
  const history = useHistory();
  const {createUserAsync} = useAccountApi();
  const [userCredentials, setuserCredentials] = useState<UserCredentials>({
    displayName: 'kutaycan01',
    userName: 'kutaycan01@gmail.com',
    password: '123456',
  });
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const handleuserCredentials = (val: UserCredentials) => {
    setuserCredentials(val);
  };
  const handleSignUp = async (): Promise<void> => {
    await createUserAsync(
      userCredentials.displayName,
      userCredentials.userName,
      userCredentials.password,
    );
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
          key="signUp-background"
          source={require('../../assets/img/menu-photo.jpg')}
          style={styles.image}
        />
      </View>
      <View key="signUp-view4" style={styles.fadingContainer}>
        <CustomInput
          key="signUp-displayName"
          onSubmitEditing={e => {
            handleuserCredentials({
              ...userCredentials,
              displayName: e.nativeEvent.text,
            });
          }}
          placeholder={'Ad Soyad'}
          iconName="user"
          borderColor="black"
          focusedBorderColor="black"
        />
        <CustomInput
          key="signUp-userName"
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
          key="signUp-password"
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
        text={'Üye Ol'}
        onPress={handleSignUp}
      />
      <View style={styles.button2Container}>
        <Text>Zaten Hesabın Mı Var?</Text>
        <Button
          buttonStyle={styles.button2}
          text={'Giriş Yap'}
          onPress={() => history.push(routes.login)}
        />
      </View>
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
export default SignUpScreen;
