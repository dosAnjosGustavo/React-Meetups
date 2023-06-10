import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAPI } from './fetchAPI';

// /api/new-meetup
// POST /api/new-meetup

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;

    const { meetupsCollection, client } = await fetchAPI();

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
