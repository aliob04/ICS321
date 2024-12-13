import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request
) {
    try {
        const body = await request.json()
        const { email, name, password } = body

        if (!email || !name || !password) {
            console.log('Missing required fields:', { email, name, password })
            return new NextResponse('Missing info', { status: 400 })
        }

        console.log('Attempting to create user:', { email, name })
        
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        console.log('User created successfully:', user)
        return NextResponse.json(user)
    } catch (error) {
        console.error('REGISTRATION ERROR:', error)
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 })
    }
}