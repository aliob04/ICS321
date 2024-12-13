import { Button } from '@/components/ui/button'
import prisma from '../utils/db'
    async function postDate(){
        'use server'
        await prisma.train.createMany({
            data: [
                {
                nameArabic:"قطار الحرمين الشرفين",
                nameEnglish:"Mekka Train",
                },
               {
              
                nameArabic:"مترو الرياض",
                nameEnglish:"Metro Riyadh",
               },
               {
                nameArabic:"قطار الخليج",
                nameEnglish:"khaledj Train"
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