'use client'
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import {useState, useEffect} from 'react'
import { usePathname } from "next/navigation";
import CardContent from './CardContent'
import { Train } from "@prisma/client"
import  Container  from "./Container";

interface CardProps{
    nameArabic: string,
    nameEnglish: string,
    arrivalTime:string,
    departureTime:string,
}


export default async function Card() {
    const [open, setOpen] = useState(false)
    const data = await TrainData()
    const pathname = usePathname()
 

    function TrainData() {
        const [trainData, setTrainData] = useState([]);
    
        useEffect(() => {
            const fetchTrainData = async () => {
                try {
                    const data = await prisma.train.findMany({
                        select: {
                            id: true,
                            nameArabic: true,
                            nameEnglish: true,
                            fromStationId: true,
                            toStationId: true,
                            departureTime: true,
                            arrivalTime: true
                        }
                    });
                    setTrainData(data);
                } catch (error) {
                    console.error('Error fetching train data:', error);
                }
            };
    
            fetchTrainData();
        }, []);
    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {trainData.map((train) => (
                <div key={train.id} className="relative h-48">
                    {/* <Image src={movie.imageString} alt="Movie" className="rounded-sm absolute w-full h-full object-cover" width={400} height={500}/> */}
                    <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                        <div className="bg-gradient-to-b from-transparent via-black/50 to-black w-full h-full z-10 rounded-lg flex items-center justify-center">
                            {/* <Image src={movie.imageString} alt="Movie" width={800} height={800} className="absolute rounded-lg w-full h-full -z-10 object-cover"/> */}
                            <CardContent age={movie.age} duration={movie.duration} year={movie.release} movieId={movie.id} overview={movie.overview} title={movie.title} youtubeUrl={movie.youtubeString} watchListId={movie.WathcLists[0]?.id} watchList={movie.WathcLists.length > 0 ? true:false} key={movie.id}/>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}
