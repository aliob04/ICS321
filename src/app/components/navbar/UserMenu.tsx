"use client"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "@/app/components/utils/Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"
import { signOut } from 'next-auth/react'



interface UserMenuProps {
    currentUser ?: User | null
}
const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isOpen,setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    },[])

   


  return (
    <div className="
    relative
    ">
        
        <div className="
        flex
        flex-row
        items-center
        gap-3
        ">
            <div 
                onClick ={()=>{}}
                className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                transition
                hover:bg-neutral-100
                cursor-pointer
            ">
                KFUPM trainstations
            </div>
            <div 
                onClick ={toggleOpen} 
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            "> 
                <AiOutlineMenu />
                <div className="
                hidden
                md:block

                ">
                    <Avatar />
                </div>
            </div>
        </div>
        {isOpen && (
            <div 
                className="
                absolute 
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm         
            ">
                <div 
                    className="
                    flex 
                    flex-col 
                    cursor-pointer
                ">

                {currentUser ? (
                    <>
                        {console.log(currentUser)}
                        <MenuItem onClick={()=>{}} label={currentUser.email as string}/>
                        <hr />
                        <MenuItem onClick={()=>{console.log(currentUser.id,currentUser.email)}} label="My reservations"/>
                        <MenuItem onClick={()=>{}} label="My properties"/> 
                        <MenuItem onClick={()=>{}} label="KFUPM Trainstations"/> 
                        <hr />
                        <MenuItem onClick={() => signOut()} label="Logout"/> 
                    </>
                ):(
                    <>
                        <MenuItem onClick={loginModal.onOpen} label="Login"/>
                        <MenuItem onClick={registerModal.onOpen} label="Sign up"/> 
                    </>
                )}
                      

                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu