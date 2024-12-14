'use client'

import  { Button } from '@/components/ui/button'
import { useState } from "react";



interface CardProps{
    nameArabic: string,
    nameEnglish: string,
    arrivalTime:string,
    departureTime:string,
}
export function MovieCard({nameArabic,nameEnglish,departureTime,arrivalTime}:CardProps) {
    const [open,setOpen] = useState(false)


    return (
        <>
            <button onClick={() => setOpen(true)}>
                
            </button>

            <div className="absolute right-5 top-5 z-10">
                
            </div>
            <div className="p-5 absolute bottom-0 left-0">
                <h1 className="font-bold text-md line-clamp-1">{nameEnglish}</h1>
                <h2 className="font-bold text-md line-clamp-1">{nameArabic}</h2>
                <div className="flex gap-x-2 items-center">
                    <p className="font-normal text-sm">{departureTime}</p>
                    <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm text-center">+++</p>
                    <p className="font-normal text-sm">{arrivalTime}h</p>
                </div>
                <p className="line-clamp-1 text-sm text-gray-200 font-light">
                    overview
                </p>
            </div>
           
        </>
    )
}