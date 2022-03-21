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
import { useRouter } from 'next/router';
import { dateFunctions } from '@utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { toggleIsDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    toggleIsDragging(true);
    e.dataTransfer.setData('text', entry._id);
  };

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    toggleIsDragging(false);
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onClick}
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
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
