import ProviderDTO from "@/features/providers/providerDTO";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const serverUrl = process.env.SERVER_URL;

async function retrieveProviders(req: NextApiRequest, res: NextApiResponse) {
  const request = await axios.get<Array<ProviderDTO>>(`${serverUrl}/providers`);
  if (request.status < 200 && request.status >= 400) {
    console.error("Request Error");
    res.status(500).end();
  }
  res.status(200).json(request.data);
}

async function createProvider(req: NextApiRequest, res: NextApiResponse) {
  const request = await axios.post<ProviderDTO>(
    `${serverUrl}/providers`,
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
      await retrieveProviders(req, res);
      return;
    case "POST":
      await createProvider(req, res);
      return;
  }

  res.status(405).end();
}
