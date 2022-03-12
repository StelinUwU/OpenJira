import { FC, useReducer } from 'react';
import { UIContext } from './UIContext';
import { UIReducer } from './UIReducer';

export interface UIState {
  sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: '[UI]-Open-Sidebar' });

  const closeSideMenu = () => dispatch({ type: '[UI]-Close-Sidebar' });

  return (
    <UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
