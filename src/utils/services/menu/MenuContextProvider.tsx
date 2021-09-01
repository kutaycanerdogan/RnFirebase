import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {Menu} from '../../../types/model/Menu';
import {MenuInitialState, MenuReducer} from './Menu';
export interface MenuContextState {
  menus: Array<Menu> | null;
  isFetching: boolean;
  state: any;
  dispatch: React.Dispatch<any>;
}

const MenuContextDefaultValues: MenuContextState = {
  menus: [],
  isFetching: false,
  state: null,
  dispatch: () => {},
};
export const MenuContext = createContext<MenuContextState>(
  MenuContextDefaultValues,
);
export const MenuContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(MenuReducer, MenuInitialState);
  return (
    <MenuContext.Provider
      value={{...MenuContextDefaultValues, ...state, dispatch}}>
      {children}
    </MenuContext.Provider>
  );
};
export const useMenuValues = () => useContext(MenuContext);
export default MenuContextProvider;
