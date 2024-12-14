// src/app/components/home/HomePage.tsx

'use client';

import dynamic from 'next/dynamic';

// Dynamically import components with SSR disabled
const SearchForm = dynamic(() => import('@/app/components/search/SearchForm'), { ssr: false });
const TrainList = dynamic(() => import('@/app/components/utils/TrainList'), { ssr: false });

const HomePage = () => {
    return (
        <div>
            <SearchForm />
            <TrainList />
            {/* Add other components as needed */}
        </div>
    )
}

export default HomePage;
