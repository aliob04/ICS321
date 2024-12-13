'use client'

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback,useState } from "react"
import {FieldValues, SubmitHandler,useForm} from 'react-hook-form'
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "@/app/components/modals/Modal"
import Heading from "@/app/components/utils/Heading"
import Button from "@/app/components/utils/Button"
import Input from "@/app/components/utils/Input"
import toast from "react-hot-toast"
import useLoginModal from "@/app/hooks/useLoginModal"
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from "next/navigation"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { getServerSession } from "next-auth"

const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading,setIsLoading] = useState(false)
    const { data: session, status } = useSession();




    const {
        register,
        handleSubmit,
        formState:{
        errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email: '',
            password: ''
        }
    })

    const onSubmit:  SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials',{...data,redirect:false})
        .then((callback) =>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success('Logged in')
                signIn('credentials')
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }
    
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Login to Your Account' />
            <Input id='email' label='Email' disable={isLoading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disable={isLoading} register={register} errors={errors}  required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
                <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=> signIn('google')}/>
                <Button outline label='Continue with Github' icon={AiFillGithub} onClick={()=> signIn('github')}/>
            <div 
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                '>
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div>
                            Already have an account
                        </div>
                        <div className='text-neutral-500 cursor-pointer hover:underline' onClick={registerModal.onClose}>
                            Log in
                        </div>
                    </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal