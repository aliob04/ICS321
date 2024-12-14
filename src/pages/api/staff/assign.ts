import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { staffId, trainId, date } = req.body;
      const assignment = await prisma.schedule.create({
        data: {
          staffId,
          trainId,
          date: new Date(date)
        }
      });
      res.status(201).json(assignment);
    } catch (error) {
      console.error('Error assigning staff:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
