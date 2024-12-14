"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Logo = () => {
    const router = useRouter()
  return (
    <Link href="/home" ><Image  alt='logo' className='hidden md:block cursor-pointer' width="70" height="70" src='/images/kfupm logo.webp'/></Link>
  )
}

export default Logo
