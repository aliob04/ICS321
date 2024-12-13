'use client'
import axios from "axios"
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


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading,setIsLoading] = useState(false)



    const {
        register,
        handleSubmit,
        formState:{
        errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name:'',
            email: '',
            password: ''
        }
    })

    const onSubmit:  SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register',data)
        .then(() => {
            console.log('Data sent successfully:', data);
            registerModal.onClose()
        })
        .catch((error) => {
            console.error('Error response:', error.response?.data || error.message);
            toast.error("Something went wrong")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }
    
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to KFUPM Trainstations' subtitle='Create an account!' />
            <Input id='email' label='Email' disable={isLoading} register={register} errors={errors} required/>
            <Input id='name' label='Name' disable={isLoading} register={register} errors={errors}  required/>
            <Input id='password' label='Password' type='password' disable={isLoading} register={register} errors={errors}  required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
                <Button outline label='Continue with Google' icon={FcGoogle} onClick={null}/>
                <Button outline label='Continue with Github' icon={AiFillGithub} onClick={null}/>
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
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal