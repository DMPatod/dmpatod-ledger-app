import Link from "next/link";
import { Grid, Paper } from "@mui/material";
import ProductsTable from "@/features/products/components/ProductsTable";
import TicketCreator from "@/features/tickets/components/TicketCreator";
import DashboardGraph from "@/features/graphs/components/DashboardGraph";

const Index = () => {
  return (
    <main>
      <Grid component={Paper} container spacing={2}>
        {/* <Grid2 size={3}>
            <ProductsTable />
          </Grid2> */}
        <Grid size={6}>
          <DashboardGraph user="Graph" />
        </Grid>
        <Grid component={Paper} size={3}>
          <ul>
            <li>
              <Link href="/orders">Visualize Orders</Link>
            </li>
            <li>
              <Link href="/products">Visualize Products</Link>
            </li>
            <li>
              <Link href="/providers">Visualize Providers</Link>
            </li>
            <li>
              <Link href="/tickets">Visualize Tickets</Link>
            </li>
            <li>
              <Link href="/tickets/create">Create Tickets</Link>
            </li>
            <li>
              <Link href="/bills">Visualize Tickets</Link>
            </li>
          </ul>
        </Grid>
        <Grid component={Paper} size={12}>
          {/*<TicketCreator />*/}
        </Grid>
      </Grid>
    </main>
  );
};

export default Index;
