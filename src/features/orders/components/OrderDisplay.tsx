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
import OrderDTO from "../orderDTO";
import ProductDTO from "@/features/products/productDTO";

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
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{(order.product as ProductDTO).name}</TableCell>
              <TableCell>{order.value}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.value * order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Value</TableCell>
            <TableCell>
              {orders.reduce(
                (sum, order) => sum + order.value * order.amount,
                0
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default OrderDisplay;
