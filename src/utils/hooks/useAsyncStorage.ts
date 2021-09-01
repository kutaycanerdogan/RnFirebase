import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
const useAsyncStorage = () => {
  const [storageValue, setStorageValue] = useState<string | null>('');

  const getValue = async (key: string) => {
    let value = await AsyncStorage.getItem(key);
    setStorageValue(value);
  };
  const setValue = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };
  const removeValue = async (key: string) => {
    await AsyncStorage.removeItem(key);
  };
  const clear = async () => {
    await AsyncStorage.clear();
  };
  return {
    value: storageValue,
    setItem: (key: string, value: string) => {
      return setValue(key, value);
    },
    getItem: (key: string) => {
      getValue(key);
      return storageValue;
    },
    removeItem: (key: string) => {
      removeValue(key);
    },
    removeAll: () => {
      clear();
    },
  };
};

export default useAsyncStorage;
