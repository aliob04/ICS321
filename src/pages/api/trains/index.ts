import { NextApiRequest, NextApiResponse } from 'next';

const trains = [
  {
    id: '1',
    nameEnglish: 'Train A',
    fromStation: { name: 'Station 1' },
    toStation: { name: 'Station 2' },
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(trains);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
