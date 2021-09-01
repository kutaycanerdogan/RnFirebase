import {MenuContextState, useMenuValues} from './MenuContextProvider';
import {
  GetAllMenusAsync,
  CreateMenuAsync,
  UpdateMenuAsync,
  DeleteMenuAsync,
} from './api';
import {Alert} from 'react-native';
import {Menu} from '../../../types/model/Menu';

const MenuInitialState = {
  menus: [],
  isFetching: false,
};
const MenuReducer = (state: MenuContextState, action: any) => {
  return {
    ...state,
    ...action.payload,
  };
};
const useMenuApi = () => {
  const {dispatch} = useMenuValues();

  const getAllMenusAsync = async () => {
    try {
      dispatch({
        payload: {
          menus: result,
          isFetching: true,
        },
      });
      var result = await GetAllMenusAsync();
      if (!!result) {
        dispatch({
          payload: {
            menus: result,
            isFetching: false,
          },
        });
      } else {
        Alert.alert(`Menulere ulaşılamadı, StatusCode: ${result.statusCode}`);
      }
    } catch (error) {
      Alert.alert(`Menulere ulaşılamadı, ${error.message}`);
    } finally {
      dispatch({
        payload: {
          isFetching: false,
        },
      });
    }
  };
  const createMenuAsync = async (data: Menu) => {
    try {
      dispatch({
        payload: {
          isFetching: true,
        },
      });
      var result = await CreateMenuAsync(data);
      if (!result) {
        Alert.alert(`Menu eklenemedi, StatusCode: ${result.statusCode}`);
      }
    } catch (error) {
      Alert.alert(`Menu eklenemedi, StatusCode: ${error.message}`);
    } finally {
      dispatch({
        payload: {
          isFetching: false,
        },
      });
    }
  };
  const updateMenuAsync = async (data: Menu) => {
    try {
      dispatch({
        payload: {
          isFetching: true,
        },
      });
      var result = await UpdateMenuAsync(data);
      if (!result) {
        Alert.alert(`Menu güncellenemedi, StatusCode: ${result.statusCode}`);
      }
    } catch (error) {
      Alert.alert(`Menu güncellenemedi, StatusCode: ${error.message}`);
    } finally {
      dispatch({
        payload: {
          isFetching: false,
        },
      });
    }
  };
  const deleteMenuAsync = async (data: Menu) => {
    try {
      dispatch({
        payload: {
          isFetching: true,
        },
      });
      var result = await DeleteMenuAsync(data);
      if (!result) {
        Alert.alert(`Menu silinemedi, StatusCode: ${result.statusCode}`);
      }
    } catch (error) {
      Alert.alert(`Menu silinemedi, StatusCode: ${error.message}`);
    } finally {
      dispatch({
        payload: {
          isFetching: false,
        },
      });
    }
  };

  return {
    getAllMenusAsync,
    createMenuAsync,
    updateMenuAsync,
    deleteMenuAsync,
  };
};
export {MenuInitialState, MenuReducer, useMenuApi};
