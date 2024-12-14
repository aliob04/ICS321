// app/components/utils/TrainCard.tsx (Client Component)
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { Train } from "@prisma/client";

interface TrainCardProps {
  trains: Pick<Train, "id" | "nameArabic" | "nameEnglish">[];
}

export default function TrainCard({ trains }: TrainCardProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Any client-side effects you want
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {trains.map((train) => (
        <div key={train.id} className="relative h-48">
          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black w-full h-full z-10 rounded-lg flex items-center justify-center">
              {/* Render your train info here */}
              <p>{train.nameArabic} - {train.nameEnglish}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
