import { UIState } from './UIProvider';

type UIActionType =
  | { type: '[UI]-Open-Sidebar' }
  | { type: '[UI]-Close-Sidebar' }
  | { type: '[UI]-setIsAddingEntry'; payload: boolean }
  | { type: '[UI]-setIsDragging'; payload: boolean };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI]-Open-Sidebar':
      return {
        ...state,
        sideMenuOpen: true,
      };
    case '[UI]-Close-Sidebar':
      return {
        ...state,
        sideMenuOpen: false,
      };
    case '[UI]-setIsAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case '[UI]-setIsDragging':
      return {
        ...state,
        isDragging: action.payload,
      };
    default:
      return state;
  }
};
