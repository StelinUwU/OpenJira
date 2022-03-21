import { FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Layout } from '@components/layouts';
import {
  capitalize,
  Grid,
  CardHeader,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Entry, EntryStatus } from '@interfaces';
import { dbEntries } from '@database';
import { EntriesContext } from '@context/entries';
import { dateFunctions } from '@utils';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const router = useRouter();

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length <= 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
    router.push('/');
  };

  const onDelete = () => {
    deleteEntry(entry._id);
    router.push('/');
  };

  return (
    <Layout title={inputValue.substring(0, 15) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Task`}
              subheader={`Created ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            ></CardHeader>
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New entry"
                autoFocus
                multiline
                label="New entry"
                value={inputValue}
                onChange={onInputChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Write something'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
