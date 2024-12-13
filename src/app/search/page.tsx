'use client';

import { useState } from 'react';
import SearchForm from '@/app/components/search/SearchForm';

export default function SearchPage() {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="pt-28">
        <h1 className="text-3xl font-bold mb-8">Search Trains</h1>
        <SearchForm />
      </div>
    </div>
  );
} 