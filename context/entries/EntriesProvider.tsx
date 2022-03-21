import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { Entry } from '@interfaces';
import { EntriesContext } from './EntriesContext';
import { EntriesReducer } from './EntriesReducer';
import { entriesApi } from '@api';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE);

  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: '[Entry] Add-Entry', payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackBar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description: description,
        status: status,
      });
      dispatch({ type: '[Entry] Entry-updated', payload: data });

      if (showSnackBar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const callEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Load-Entries', payload: data });
  };

  const deleteEntry = async (id: string) => {
    try {
      await entriesApi.delete(`/entries/${id}`);
      dispatch({ type: '[Entry] Delete-Entry', payload: id });
      enqueueSnackbar('Entry deleted', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    callEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
