import { getServerSession } from 'next-auth/next'

import prisma from '../utils/db'
import {authOptions} from '@/app/utils/auth'


export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try{
        const session = await getSession()
        if(!session?.user?.email){
            return null
        }
    const currentUser = await prisma.user.findUnique({
        where:{
            email: session.user.email as string
        }
    })
    if(!currentUser){
        return null
    }
    return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString()
    }
    }catch(error: any){
        // we didn't throw an error because it is not an api call it is direct connect to the data base  
        return null
    }
    
}