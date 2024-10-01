import { NextApiRequest, NextApiResponse } from "next";

const serverUrl = process.env.SERVER_URL;

async function retrieveProducts(req: NextApiRequest, res: NextApiResponse) {
  const products: Array<ProductDTO> = [
    { name: "Product 1" },
    { name: "Product 2" },
  ];
  res.status(200).json(products);
  return products;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      var products: Array<ProductDTO> = await retrieveProducts(req, res);
      return;
    case "POST":
      res.status(201).json({ name: "John Doe" });
      return;
    default:
      res.status(405).end();
  }
}
