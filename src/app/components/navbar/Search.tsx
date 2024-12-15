"use client"
import { usePathname } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
const Search = () => {
  const pathName = usePathname()
  return (
    <div className='
    mt-4
    w-full 
    md:w-auto py-2 
    transition 

    '>
       {/*open flex */}
      <div className="
      flex
      flex-row
      items-center
      justify-between">
        {/* first item in the flex */}
        <div className="
        text-xl 
        font-bold
        px-6
        ">


        </div>
        { pathName !== '/dashboard' ? '':<h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Admin Dashboard
    </h2>}
        { pathName !== '/reservation' ? '':<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Reservation
    </h2>}
        </div>
        {/* close flex*/}
      </div>
 
  )
}

export default Search
