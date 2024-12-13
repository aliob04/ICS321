import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from_station = searchParams.get("from_station");
  const to_station = searchParams.get("to_station");
  const date = searchParams.get("date");

  if (!from_station || !to_station || !date) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    const trains = await prisma.schedule.findMany({
      where: {
        AND: [
          { train: { nameEnglish: from_station } },
          { station: { name: to_station } },
          { date: new Date(date) },
        ],
      },
      include: {
        train: true,
        station: true,
      },
    });

    return NextResponse.json(trains);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
