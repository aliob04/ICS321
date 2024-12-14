import { User } from '@prisma/client'
import Logo from './Logo'
import Container from '@/app/components/utils/Container'
import Search from './Search'
import UserMenu from './UserMenu'
import Inbox from './Inbox'

interface NavbarProps{
  currentUser?: User | null
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm '>
      <div className=' py-4 border-b-[1px]'>
        <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                <Logo />
                <Search />
                <UserMenu currentUser={currentUser as User}/>
            </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
