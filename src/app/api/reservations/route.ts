import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        train: {
          select: {
            id: true,
            nameArabic: true,
            nameEnglish: true,
            departureTime: true,
            arrivalTime: true,
            fromStation: {
              select: {
                name: true,
              },
            },
            toStation: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
} 