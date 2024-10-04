import ProductDTO from "@/features/products/productDTO";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const serverUrl = process.env.SERVER_URL;

async function retrieveProducts(req: NextApiRequest, res: NextApiResponse) {
  const request = await axios.get<Array<ProductDTO>>(`${serverUrl}/products`);
  if (request.status < 200 && request.status >= 400) {
    console.error("Request Error");
    res.status(500).end();
  }
  res.status(200).json(request.data);
}

async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  const request = await axios.post<ProductDTO>(
    `${serverUrl}/products`,
    req.body
  );
  if (request.status < 200 && request.status >= 400) {
    console.error("Request Error");
    res.status(500).end();
  }
  res.status(201).json(request.data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await retrieveProducts(req, res);
      return;
    case "POST":
      await createProduct(req, res);
      return;
    default:
      res.status(405).end();
  }
}
