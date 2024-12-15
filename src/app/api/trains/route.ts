import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const trains = await prisma.train.findMany({
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
    });

    return NextResponse.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trains' },
      { status: 500 }
    );
  }
} 