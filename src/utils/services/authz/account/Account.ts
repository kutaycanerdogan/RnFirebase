import {USER_TOKENS, AUTHENTICATED, USER} from '../../../consts/userConsts';
import {AccountContextState, useAccountValues} from './AccountContextProvider';
import localStorage from '../../../helpers/storage/StorageNative';
import auth from '@react-native-firebase/auth';
import {CreateUserAsync, GetCurrentUserAsync} from './api';
import {Alert} from 'react-native';

const AccountInitialState = {
  authUser: localStorage.getItem(USER) || null,
  authBody: localStorage.getItem(USER_TOKENS) || null,
  authenticated: localStorage.getItem(AUTHENTICATED) || false,
  isFetching: false,
};
const AccountReducer = (state: AccountContextState, action: any) => {
  return {
    ...state,
    ...action.payload,
  };
};
const useAccountApi = () => {
  const {isFetching, dispatch} = useAccountValues();
  const createTokenAsync = async (email: string, password: string) => {
    if (!isFetching) {
      dispatch({
        payload: {
          isFetching: true,
        },
      });
    }
    try {
      var {
        user: {uid},
      } = await auth().signInWithEmailAndPassword(email, password);
      var token = await auth().currentUser.getIdToken();
      const currentUser = await GetCurrentUserAsync(uid);
      dispatch({
        payload: {
          authBody: token,
          authUser: currentUser,
          authenticated: true,
          isFetching: false,
        },
      });
    } catch (error) {
    } finally {
      dispatch({
        payload: {
          isFetching: false,
        },
      });
    }
  };

  const createUserAsync = async (
    displayName: string,
    email: string,
    password: string,
  ) => {
    try {
      dispatch({
        payload: {
          isFetching: true,
        },
      });
      var result = await CreateUserAsync({displayName, email, password});
      if (!!result.message) {
        Alert.alert(result.message);
      } else {
        await createTokenAsync(email, password);
      }
    } catch (error) {
    } finally {
      dispatch({
        payload: {
          isFetching: false,
        },
      });
    }
  };

  return {
    createUserAsync,
    createTokenAsync,
  };
};
export {AccountInitialState, AccountReducer, useAccountApi};
