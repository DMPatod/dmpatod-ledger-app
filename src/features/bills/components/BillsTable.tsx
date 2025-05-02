import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Fragment } from "react";
import BillDTO from "../billDTO";
import useFetchApi from "@/features/utils/useFetchApi";
import moment from "moment";

const BillsTable = () => {
  const [data, loading, error] = useFetchApi<Array<BillDTO>>("/api/bills", []);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Button>click</Button>
                  </TableCell>
                  <TableCell>
                    {moment(item.date).format("DD/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {moment(item.dueDate).format("DD/MM/yyyy")}
                  </TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => console.log(data)}>Log</Button>
      {loading && <CircularProgress size={24} />}
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default BillsTable;
