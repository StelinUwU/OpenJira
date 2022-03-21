import { Entry } from '@interfaces';
import { createContext } from 'react';

export interface EntriesContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackBar?: boolean) => void;
  deleteEntry: (id: string) => void;
}

export const EntriesContext = createContext<EntriesContextProps>(
  {} as EntriesContextProps
);
