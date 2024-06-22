'use client';

import TemplateList from '@/components/template/list';

export default function Home() {
  return (
    <main>
      {/* <div className="flex items-center justify-center h-[200px] w-full">
        <SearchArea />
      </div>
      <div className='overflow-y-scroll scrollbar-none h-[calc(100vh-200px-50px-25px)]'>
        <TemplateList />
      </div> */}
      <div className='overflow-y-scroll scrollbar-none py-10 h-[calc(100vh-50px)]'>
        <TemplateList />
      </div>
    </main>
  );
}
