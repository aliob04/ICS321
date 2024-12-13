"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Logo = () => {
    const router = useRouter()
  return (
    <Image  alt='logo' className='hidden md:block cursor-pointer' width="70" height="70" src='/images/kfupm logo.webp'/>
  )
}

export default Logo
