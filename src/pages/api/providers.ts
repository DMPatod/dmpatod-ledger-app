import { NextApiRequest, NextApiResponse } from "next";

const serverUrl = process.env.SERVER_URL;

// const agent = new Agent({
//   ca: readFileSync("./certificates/localhost.pem"),
// });

const providers: Array<ProviderDTO> = [];

async function retrieveProviders(req: NextApiRequest, res: NextApiResponse) {
  // const url = `${serverUrl}/providers`;
  // const request = await fetch(url);
  // if (request.status < 200 && request.status >= 400) {
  //   console.log("Request", request);
  //   console.error("Request Error");
  // }
  // const response = await request.json();

  // var providers: Array<ProviderDTO> = response.map((item: any) => ({
  //   name: item.name,
  // }));
  res.status(200).json(providers);
  return providers;
}

async function createProvider(req: NextApiRequest, res: NextApiResponse) {
  providers.push({ name: req.body.name });

  res.status(201).json({ id: "justCreated", ...req.body } as ProviderDTO);
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
    default:
      res.status(405).end();
  }
}
