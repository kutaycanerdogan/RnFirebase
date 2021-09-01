let dbStore: any = {};

const set = (key: string, value: string) => {
  dbStore[key] = value;
};

const get = (key: string) => {
  return dbStore[key];
};

const getAll = () => {
  return dbStore;
};

const remove = (key: string) => {
  delete dbStore[key];
};

const clearAll = () => {
  dbStore = {};
};
export const storage = {
  set,
  get,
  getAll,
  remove,
  clearAll,
};
export default storage;
