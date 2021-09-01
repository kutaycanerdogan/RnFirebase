import {useAccountValues} from '../services/authz/account/AccountContextProvider';
import useAsyncStorage from './useAsyncStorage';
import localStorage from '../helpers/storage/StorageNative';
import auth from '@react-native-firebase/auth';

const useLogoff = () => {
  const {dispatch} = useAccountValues();
  const storage = useAsyncStorage();
  return {
    logOff: async () => {
      storage.removeAll();
      localStorage.clear();
      dispatch({
        payload: {
          authBody: null,
          authUser: null,
          authenticated: false,
        },
      });
      try {
        await auth().signOut();
      } catch (error) {}
    },
  };
};

export default useLogoff;
