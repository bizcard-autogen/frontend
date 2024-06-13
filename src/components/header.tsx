export default function Header() {
  return (
    <header className='bg-main flex items-center justify-between h-full'>
      <div className='w-80'></div>
      <div className='text-white text-lg'>
        BizCard
      </div>
      <div className='flex justify-end w-80'>
        <div className='bg-white rounded cursor-pointer text-main text-sm font-bold mr-3 px-1 py-1/2 select-none'>利用ルール</div>
      </div>
    </header>
  );
}
