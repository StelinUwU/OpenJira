import { Entry } from '@models';
import { db, seedData } from '@database';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(200).json({ message: 'Access denied' });
  }

  await db.connect();
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  await db.disconnect();

  return res.status(200).json({ message: 'Seeded' });
}
