import { FC, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { Entry } from '@interfaces';
import { EntriesContext } from './EntriesContext';
import { EntriesReducer } from './EntriesReducer';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuid(),
      description: 'Completed: Lorem, ipsum dolor.',
      status: 'completed',
      createdAt: Date.now(),
    },
    {
      _id: uuid(),
      description: 'In-progress:Lorem ipsum dolor sit.',
      status: 'in-progress',
      createdAt: Date.now() - 50000,
    },
    {
      _id: uuid(),
      description: 'Pending:Lorem ipsum dolor sit amet consectetur.',
      status: 'pending',
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuid(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    };
    dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] Entry-updated', payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
