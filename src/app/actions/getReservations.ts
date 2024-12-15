import prisma from "../utils/db"


export default async function getReservations(){
    const reservations = await prisma.reservation.findMany({
        select:{
            id:true,
            passengerId:true 
        }
    })
    return reservations
}