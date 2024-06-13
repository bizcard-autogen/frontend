'use client';

import Header from '@/components/header';
import SearchArea from '@/components/search/area';
import TemplateList from '@/components/template/list';

export default function Home() {
  return (
    <main>
      <div className='h-[50px]'>
        <Header />
      </div>
      <div className="flex items-center justify-center h-[200px] w-full">
        <SearchArea />
      </div>
      <div className='overflow-y-scroll scrollbar-none h-[calc(100vh-200px-50px-25px)]'>
        <TemplateList />
      </div>
    </main>
  );
}
