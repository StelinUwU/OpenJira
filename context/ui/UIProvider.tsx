import { FC, useReducer } from 'react';
import { UIContext } from './UIContext';
import { UIReducer } from './UIReducer';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: '[UI]-Open-Sidebar' });

  const closeSideMenu = () => dispatch({ type: '[UI]-Close-Sidebar' });

  const toggleIsAddingEntry = (payload: boolean) =>
    dispatch({ type: '[UI]-setIsAddingEntry', payload });

  const toggleIsDragging = (payload: boolean) =>
    dispatch({ type: '[UI]-setIsDragging', payload });

  return (
    <UIContext.Provider
      value={{
        ...state,
        closeSideMenu,
        openSideMenu,
        toggleIsAddingEntry,
        toggleIsDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
