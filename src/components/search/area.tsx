import SearchBar from './bar';
import SearchTag from './tag';

export default function SearchArea() {
  return (
    <div className='flex flex-col w-1/2 max-w-[500px]'>
      <SearchBar />
      <div className='flex flex-wrap gap-1 mt-3'>
        <SearchTag text='かっこいい' />
        <SearchTag text='かわいい' />
        <SearchTag text='和風' />
        <SearchTag text='スタイリッシュ' />
      </div>
    </div>
  );
}
