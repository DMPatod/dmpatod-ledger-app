import ProductDTO from "../products/productDTO";

export default interface OrderDTO {
  id?: string;
  product: ProductDTO | string | null;
  value: number;
  amount: number;
}
