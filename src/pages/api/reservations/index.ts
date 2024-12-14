import { NextApiRequest, NextApiResponse } from 'next';

const reservations = [
  {
    id: '1',
    passenger: { user: { name: 'John Doe' } },
    train: { nameEnglish: 'Train A' },
    fromStation: { name: 'Station 1' },
    toStation: { name: 'Station 2' },
    date: new Date().toISOString(),
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all reservations
    return res.status(200).json(reservations);
  } 
  else if (req.method === 'POST') {
    const newReservation = req.body;
    newReservation.id = (reservations.length + 1).toString();
    reservations.push(newReservation);
    return res.status(201).json(newReservation);
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
