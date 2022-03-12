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
      description: 'Lorem, ipsum dolor.',
      status: 'completed',
      createdAt: Date.now(),
    },
    {
      _id: uuid(),
      description: 'Lorem ipsum dolor sit.',
      status: 'in-progress',
      createdAt: Date.now() - 50000,
    },
    {
      _id: uuid(),
      description: 'Lorem ipsum dolor sit amet consectetur.',
      status: 'pending',
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE);

  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
