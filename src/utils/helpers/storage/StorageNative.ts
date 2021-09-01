import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from './StorageMemory';
const getAllItemsForKeys = (keys: string[]) => {
  const promiseAll = keys.map(key =>
    AsyncStorage.getItem(key)
      .then(data => data && JSON.parse(data))
      .then(data => {
        storage.set(key, data);
        return {[key]: data};
      }),
  );

  return Promise.all(promiseAll)
    .then(flatMap)
};

const flatMap = (allData: object[]) => {
  let flatData = {};
  allData.forEach(data => {
    flatData = {...flatData, ...data};
  });
  return flatData;
};

const setItem = (key: string, value: string) => {
  storage.set(key, value);
  AsyncStorage.setItem(key, JSON.stringify(value))
    .then(handleSuccess)
    .catch(handleError);
};

const removeItem = (key: string) => {
  storage.remove(key);
  AsyncStorage.removeItem(key).then(handleSuccess).catch(handleError);
};

const getItem: (key: string) => string = (key: string) => {
  return storage.get(key);
};

const clear = () => {
  storage.clearAll();
  AsyncStorage.clear().then(handleSuccess).catch(handleError);
};

const getAllFromLocalStorage = () => {
  return AsyncStorage.getAllKeys().then(getAllItemsForKeys);
};

const handleSuccess = () => {
  return 'Success';
};

const handleError = (data: string) => {
  console.warn('AsyncStorage Error', data);
};
const storageService = {
  setItem,
  removeItem,
  getItem,
  store: storage.getAll,
  clear,
  getAllFromLocalStorage,
};
export default storageService;
