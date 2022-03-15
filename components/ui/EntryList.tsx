import { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';
import { EntryStatus } from '@interfaces';
import { EntriesContext } from '@context/entries';
import { UIContext } from '@context/ui';
import { EntryCard } from './';
import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, toggleIsDragging } = useContext(UIContext);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((entry) => entry._id === id);
    if (!entry) return;
    entry.status = status;
    updateEntry(entry);
    toggleIsDragging(false);
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: '95vh',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        {/* Change onDrag */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
