'use client';

import LeftIcon from '@/icons/left';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className='bg-main flex items-center justify-between h-full'>
      <div className='w-48'>
        <div
          className='cursor-pointer inline-block select-none mt-1 ml-1 p-1'
          style={{ display: pathname === '/' ? 'none' : undefined }}
          onClick={() => router.back()}
        >
          <LeftIcon size={18} />
        </div>
      </div>
      <div
        className='text-white text-lg cursor-pointer select-none'
        onClick={() => router.replace('/')}
      >
        BizCard / beta
      </div>
      <div className='flex justify-end w-48'>
        <div className='mr-3'>
          <Link href='/rules' target='_blank'>
            <div className='bg-white rounded cursor-pointer text-main text-sm font-bold px-1 py-1/2 select-none'>
              利用ルール
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
