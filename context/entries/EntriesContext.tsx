import { Entry } from '@interfaces';
import { createContext } from 'react';

export interface EntriesContextProps {
  entries: Entry[];
}

export const EntriesContext = createContext<EntriesContextProps>(
  {} as EntriesContextProps
);
