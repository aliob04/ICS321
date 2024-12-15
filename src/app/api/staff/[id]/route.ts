import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Start a transaction to handle all the related operations
    await prisma.$transaction(async (tx) => {
      // First, find all reservations associated with this user
      const userReservations = await tx.reservation.findMany({
        where: {
          userId: params.id
        }
      });

      // Delete all waiting list entries for these reservations
      if (userReservations.length > 0) {
        await tx.waitingList.deleteMany({
          where: {
            reservationId: {
              in: userReservations.map(res => res.id)
            }
          }
        });
      }

      // Delete all reservations for this user
      await tx.reservation.deleteMany({
        where: {
          userId: params.id
        }
      });

      // Update the user's access level to false (remove staff status)
      await tx.user.update({
        where: {
          id: params.id
        },
        data: {
          accessLevel: false
        }
      });
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    
    // Check if it's a Prisma error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    );
  }
} 