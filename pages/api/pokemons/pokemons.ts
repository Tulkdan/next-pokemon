import type { NextApiRequest, NextApiResponse } from "next";

export type TPokemonsResponse = {
  count: number;
  next: string;
  previous: any;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TPokemonsResponse>
) {
  try {
    if (req.method !== "GET")
      return res.status(405).end("Metodo nao suportado")

    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1292"
    const resp = await fetch(url)
    const data: TPokemonsResponse = await resp.json()

    if (!data || !data.results) {
      return res.status(500).end("Não foi possível realizar a chamada")
    }

    if (data.results.length <= 0) {
      return res.status(204).json(data)
    }

    return res.status(200).json(data)
  } catch (err) {
    res.status(500).end("Não foi possível realizar a chamada")
  }
}
