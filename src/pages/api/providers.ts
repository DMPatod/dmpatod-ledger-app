import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      var providers: Array<ProviderDTO> = [
        { name: "dakwopd" },
        { name: "dwa123" },
      ];
      res.status(200).json(providers);
      return;
    case "POST":
      var providers: Array<ProviderDTO> = [
        { name: "dakwopd" },
        { name: "dwa" },
      ];
      res.status(201).json(providers);
      return;
    default:
      res.status(405).end();
  }
}
