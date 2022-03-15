import { FC, DragEvent, useContext } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Entry } from '@interfaces';
import { UIContext } from '@context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { toggleIsDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    toggleIsDragging(true);
    e.dataTransfer.setData('text', entry._id);
  };

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    toggleIsDragging(false);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Typography variant="body2">Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
