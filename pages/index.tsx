import type { NextPage } from 'next';
import { Layout } from '@components/layouts';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title="Pending" />
            <CardContent>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title="In progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 90px)' }}>
            <CardHeader title="Completed" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
