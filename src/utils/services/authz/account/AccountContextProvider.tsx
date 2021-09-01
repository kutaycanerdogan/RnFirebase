import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, createContext, useContext, useReducer} from 'react';
import {USER_TOKENS, AUTHENTICATED, USER} from '../../../consts/userConsts';
import useAsyncStorage from '../../../hooks/useAsyncStorage';
import {AccountInitialState, AccountReducer} from './Account';
import localStorage from '../../../helpers/storage/StorageNative';

export interface AccountContextState {
  authenticated: boolean;
  authUser: FirebaseAuthTypes.User | null;
  authBody: string | null;
  isFetching: boolean;
  state: any;
  dispatch: React.Dispatch<any>;
}

const AccountContextDefaultValues: AccountContextState = {
  authenticated: false,
  authUser: null,
  authBody: null,
  isFetching: false,
  state: null,
  dispatch: () => {},
};
export const AccountContext = createContext<AccountContextState>(
  AccountContextDefaultValues,
);
export const AccountContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AccountReducer, AccountInitialState);
  const storage = useAsyncStorage();
  const {authenticated, authUser, authBody} = state;

  useEffect(() => {
    storage.setItem(AUTHENTICATED, JSON.stringify(authenticated));
    localStorage.setItem(AUTHENTICATED, JSON.stringify(authenticated));
  }, [authenticated]);

  useEffect(() => {
    storage.setItem(USER, JSON.stringify(authUser));
    localStorage.setItem(USER, JSON.stringify(authUser));
  }, [authUser]);
  useEffect(() => {
    storage.setItem(USER_TOKENS, JSON.stringify(authBody));
    localStorage.setItem(USER_TOKENS, JSON.stringify(authBody));
  }, [authBody]);

  return (
    <AccountContext.Provider
      value={{...AccountContextDefaultValues, ...state, dispatch}}>
      {children}
    </AccountContext.Provider>
  );
};
export const useAccountValues = () => useContext(AccountContext);
export default AccountContextProvider;
