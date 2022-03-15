import { useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '@context/entries';
import { UIContext } from '@context/ui';

export const NewEntry = () => {
  const { isAddingEntry, toggleIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);

  const onTextFieldChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue('');
    setTouched(false);
    toggleIsAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            autoFocus
            error={inputValue.length === 0 && touched}
            fullWidth
            helperText={inputValue.length === 0 && touched && 'Required'}
            label="New Entry"
            multiline
            onBlur={() => setTouched(true)}
            onChange={onTextFieldChange}
            sx={{ marginTop: 2, marginBottom: 1 }}
            value={inputValue}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={() => toggleIsAddingEntry(false)}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              onClick={onSave}
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          onClick={() => toggleIsAddingEntry(true)}
          startIcon={<AddIcon />}
          variant="outlined"
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};
