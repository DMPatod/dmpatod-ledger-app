import TicketDTO, { Direction } from "@/features/tickets/ticketDTO";
import useFetchApi from "@/features/utils/useFetchApi";
import { Grid, Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import moment from "moment";
import { useEffect, useState } from "react";

interface DashboardGraphProps {
  user: string;
}

const DashboardGraph: React.FC<DashboardGraphProps> = ({ user }) => {
  const [incomeAxis, setIncomeAxis] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [outcomeAxis, setOutcomeAxis] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  const [xAxis, setXAxis] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [data, loading, error] = useFetchApi<Array<TicketDTO>>(
    "/api/tickets",
    []
  );

  useEffect(() => {
    if (data.length > 0) {
      const set: { [month: number]: { income: number; outcome: number } } = {};

      data.forEach((item) => {
        if (!item.date) return;
        const month = moment(item.date).get("month") + 1;
        const direction =
          item.direction === Direction.Income ? "income" : "outcome";
        if (!set[month]) {
          set[month] = { income: 0, outcome: 0 };
        }

        set[month][direction] += item.orders.reduce(
          (acc, order) => acc + order.value * order.amount,
          0
        );
      });

      const incomeAxis = Object.keys(set).map(
        (key) => set[parseInt(key)].income
      );
      const outcomeAxis = Object.keys(set).map(
        (key) => set[parseInt(key)].outcome
      );
      const xAxis = Object.keys(set).map((key) => parseInt(key));
      
      setXAxis(xAxis);
      setIncomeAxis(incomeAxis);
      setOutcomeAxis(outcomeAxis);
    }
  }, [data]);

  return (
    <Grid component={Paper} size={12}>
      <div>{user}</div>
      <LineChart
        xAxis={[{ data: xAxis }]}
        series={[
          {
            data: incomeAxis,
          },
          {
            data: outcomeAxis,
          },
        ]}
      />
    </Grid>
  );
};

export default DashboardGraph;
