// src/app/components/modals/RegisterModal.tsx

'use client'

import dynamic from 'next/dynamic'

// Dynamically import the RegisterModalComponent with SSR disabled
const RegisterModalComponent = dynamic(() => import('./RegisterModalComponent'), { ssr: false })

const RegisterModal = () => {
    return <RegisterModalComponent />
}

export default RegisterModal
