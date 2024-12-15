'use client'
import { User } from '@prisma/client'
import Logo from './Logo'
import Container from '@/app/components/utils/Container'
import UserMenu from './UserMenu'
import Inbox from './Inbox'
import { usePathname } from 'next/navigation'
import Search from './Search'


interface NavbarProps{
  currentUser?: User | null
  
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  const pathName = usePathname()
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm '>
      <div className=' py-4 border-b-[1px]'>
        <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                <Logo />
                { pathName !== '/dashboard' ? '':<Search/>}
                { pathName !== '/reservation' ? '':<Search/>}
                <UserMenu currentUser={currentUser as User}/>
            </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
