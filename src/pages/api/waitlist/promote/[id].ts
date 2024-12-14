import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      await prisma.waitingList.update({
        where: { id: String(id) },
        data: { status: 'promoted' }
      });
      res.status(200).json({ message: 'Passenger promoted successfully' });
    } catch (error) {
      console.error('Error promoting passenger:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
