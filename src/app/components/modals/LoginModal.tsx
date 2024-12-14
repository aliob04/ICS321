// src/app/components/modals/LoginModal.tsx

'use client'

import dynamic from 'next/dynamic'

// Dynamically import the LoginModalComponent with SSR disabled
const LoginModalComponent = dynamic(() => import('./LoginModalComponent'), { ssr: false })

const LoginModal = () => {
    return <LoginModalComponent />
}

export default LoginModal
