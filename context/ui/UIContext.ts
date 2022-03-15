import { createContext } from 'react';

export interface UIContextProps {
  isAddingEntry: boolean;
  isDragging: boolean;
  sideMenuOpen: boolean;
  //Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;
  toggleIsAddingEntry: (payload: boolean) => void;
  toggleIsDragging: (payload: boolean) => void;
}

export const UIContext = createContext<UIContextProps>({} as UIContextProps);
