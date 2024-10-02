import ProductDTO from "../products/productDTO";

export default interface OrderDTO {
  id?: string;
  product: ProductDTO;
  value: number;
  amount: number;
}
