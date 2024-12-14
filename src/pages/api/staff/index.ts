import { NextApiRequest, NextApiResponse } from 'next';

const staff = [
  { id: '1', name: 'John Doe', role: 'Train Operator' },
  { id: '2', name: 'Jane Smith', role: 'Reservation Manager' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(staff);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
