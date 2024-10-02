import ProductDTO from "@/features/products/productDTO";
import { NextApiRequest, NextApiResponse } from "next";

const serverUrl = process.env.SERVER_URL;

const products: Array<ProductDTO> = [];

async function retrieveProducts(req: NextApiRequest, res: NextApiResponse) {
  // const products: Array<ProductDTO> = [
  //   { name: "Product 1" },
  //   { name: "Product 2" },
  // ];
  res.status(200).json(products);
}

async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  const product: ProductDTO = req.body;
  products.push(product);
  res.status(201).json(product);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await retrieveProducts(req, res);
    case "POST":
      return await createProduct(req, res);
    default:
      res.status(405).end();
  }
}
