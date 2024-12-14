// src/app/page.tsx

import dynamic from 'next/dynamic';

// Dynamically import HomePage with SSR enabled
// Only internal components handle their SSR behavior
const HomePage = dynamic(() => import('@/app/components/home/HomePage'), { ssr: true });

export default function Page() {
    return (
        <div>
            <HomePage />
        </div>
    )
}
