import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface OrderDisplayProps {
  orders: Array<OrderDTO>;
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ orders }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>daw</TableCell>
            <TableCell>casc</TableCell>
            <TableCell>dawdsa</TableCell>
            <TableCell>sad</TableCell>
          </TableRow>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.product.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Value</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default OrderDisplay;
