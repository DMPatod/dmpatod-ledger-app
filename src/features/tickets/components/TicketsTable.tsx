import useFetchApi from "@/features/utils/useFetchApi";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import TicketDTO from "../ticketDTO";
import { Fragment } from "react";

const TicketsTable = () => {
  const [data, loading, error] = useFetchApi<Array<TicketDTO>>(
    "/api/tickets",
    []
  );

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{item.provider as string}</TableCell>
                  {/* <TableCell>{item.date as string}</TableCell> */}
                  <TableCell>{item.orders.length}</TableCell>
                  <TableCell>{item.installments}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.direction}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => console.log(data)}>Log</Button>
    </Fragment>
  );
};

export default TicketsTable;
