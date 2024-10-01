import { NextApiRequest, NextApiResponse } from "next";

const serverUrl = process.env.SERVER_URL;

// const agent = new Agent({
//   ca: readFileSync("./certificates/localhost.pem"),
// });

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
  const providers: Array<ProviderDTO> = [
    { name: "Provider 1" },
    { name: "Provider 2" },
  ];
  res.status(200).json(providers);
  return providers;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      var providers: Array<ProviderDTO> = await retrieveProviders(req, res);
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
