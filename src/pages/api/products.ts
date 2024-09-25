import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var response: Array<ProductDTO> = [
    { name: "Product 1" },
    { name: "Product 2" },
  ];
  res.status(200).json(response);
}
