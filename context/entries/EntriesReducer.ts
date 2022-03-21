import { Entry } from '@interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesActionType =
  | { type: '[Entry] Add-Entry'; payload: Entry }
  | { type: '[Entry] Entry-updated'; payload: Entry }
  | { type: '[Entry] Load-Entries'; payload: Entry[] }
  | { type: '[Entry] Delete-Entry'; payload: string };

export const EntriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case '[Entry] Add-Entry': {
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    }
    case '[Entry] Entry-updated': {
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
            return entry;
          }
          return entry;
        }),
      };
    }
    case '[Entry] Delete-Entry': {
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    }
    case '[Entry] Load-Entries':
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};
