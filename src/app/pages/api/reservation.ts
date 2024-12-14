import { NextApiRequest, NextApiResponse } from 'next';
import { addToReservationList, deleteFromReservationList } from '@/app/actions/Notification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { trainId, pathName } = req.body;

      const formData = new FormData();
      formData.append('trainId', trainId);
      formData.append('pathName', pathName);

      const reservation = await addToReservationList(formData);
      return res.status(201).json(reservation);
    }

    if (req.method === 'DELETE') {
      const { reservationId, pathName } = req.body;

      const formData = new FormData();
      formData.append('reservationId', reservationId);
      formData.append('pathName', pathName);

      const deletedReservation = await deleteFromReservationList(formData);
      return res.status(200).json(deletedReservation);
    }

    res.setHeader('Allow', ['POST', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error("Error in reservation API:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
