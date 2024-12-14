import { Button } from '@/components/ui/button'
import prisma from '../utils/db'
    async function postDate(){
        'use server'
        // First create stations
        const MeccaStation = await prisma.station.create({
            data: { name: "Mecca Station" }
        });
        const JiddahStation = await prisma.station.create({
            data: { name: "Jiddah Station" }
        });
        const AlhassahStation = await prisma.station.create({
            data: { name: "Alhassah Station" }
        });
        const AlRiyadhStation = await prisma.station.create({
            data: { name: "AlRiyadh Station" }
        });
        const QatifStation = await prisma.station.create({
            data: { name: "Qatif Station" }
        });
        const DammanStation = await prisma.station.create({
            data: { name: "Damman Station" }
        });

        // Then create trains with station references
        await prisma.train.createMany({
            data: [
                {
                    nameArabic: "قطار الحرمين الشرفين",
                    nameEnglish: "Mekka Train",
                    fromStationId: MeccaStation.id,
                    toStationId: JiddahStation.id,
                    departureTime:"9:00am",
                    arrivalTime:"10:00am",
                },
                {
                    nameArabic: "مترو الرياض",
                    nameEnglish: "Metro Riyadh",
                    fromStationId: QatifStation.id,
                    toStationId: AlRiyadhStation.id,
                    departureTime:"5:00pm",
                    arrivalTime:"6:00pm",
                },
                {
                    nameArabic: "قطار الخليج",
                    nameEnglish: "khaledj Train",
                    fromStationId: AlhassahStation.id,
                    toStationId: DammanStation.id,
                    departureTime:"8:00pm",
                    arrivalTime:"9:00pm",
                }
            ],
        });
    }
export default function SeedDatabase() {
    return (
        <div className="m-5">
            <form action={postDate}>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}