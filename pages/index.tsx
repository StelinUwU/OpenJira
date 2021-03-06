import type { NextPage } from 'next';
import { Layout } from '@components/layouts';
import { Card, CardHeader, Grid } from '@mui/material';
import { EntryList, NewEntry } from '@components/ui';

const HomePage: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title="Pending" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title="In progress" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title="Completed" />
            <EntryList status="completed" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
