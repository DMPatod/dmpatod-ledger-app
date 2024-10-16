import useFetchApi from "@/features/utils/useFetchApi";
import ProductDTO from "../productDTO";
import { Fragment } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const ProductsTable = () => {
  const [data, loading, error] = useFetchApi<Array<ProductDTO>>(
    "/api/products",
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mesureUnit}</TableCell>
                  <TableCell>{item.averageValue}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <CircularProgress size={24} />}
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default ProductsTable;
