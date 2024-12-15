import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const stations = await prisma.station.findMany({
      select: {
        id: true,
        name: true,
        fromStation: {
          select: {
            id: true,
            nameEnglish: true,
            nameArabic: true,
            departureTime: true,
            arrivalTime: true,
          },
        },
        toStation: {
          select: {
            id: true,
            nameEnglish: true,
            nameArabic: true,
            departureTime: true,
            arrivalTime: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(stations);
  } catch (error) {
    console.error('Error fetching stations report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations report' },
      { status: 500 }
    );
  }
} 