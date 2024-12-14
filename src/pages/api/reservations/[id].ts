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
  const { id } = req.query;
  const reservationIndex = reservations.findIndex((r) => r.id === id);

  if (req.method === 'GET') {
    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    return res.status(200).json(reservation);
  } 
  else if (req.method === 'PUT') {
    if (reservationIndex === -1) return res.status(404).json({ error: 'Reservation not found' });

    reservations[reservationIndex] = { ...reservations[reservationIndex], ...req.body };
    return res.status(200).json(reservations[reservationIndex]);
  } 
  else if (req.method === 'DELETE') {
    if (reservationIndex === -1) return res.status(404).json({ error: 'Reservation not found' });

    reservations.splice(reservationIndex, 1);
    return res.status(204).end();
  } 
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
