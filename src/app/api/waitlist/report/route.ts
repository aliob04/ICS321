import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const waitlist = await prisma.waitingList.findMany({
      select: {
        id: true,
        paymentStatus: true,
        expirationDate: true,
        reservation: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            train: {
              select: {
                nameEnglish: true,
                nameArabic: true,
                departureTime: true,
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
          },
        },
      },
      orderBy: [
        {
          expirationDate: 'asc',
        },
      ],
      where: {
        expirationDate: {
          gt: new Date(), // Only show active waitlist entries
        },
      },
    });

    return NextResponse.json(waitlist);
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
} 