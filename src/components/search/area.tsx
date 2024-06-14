import { useState } from 'react';
import SearchBar from './bar';
import SearchTag from './tag';
import { Tag } from '@/utils/tag';

export default function SearchArea() {
  const [tags, setTags] = useState<Tag[]>([
    { id: '0', text: 'かっこいい' },
    { id: '1', text: 'シンプル' },
    { id: '2', text: 'スタイリッシュ' },
  ]);

  return (
    <div className='flex flex-col w-1/2 max-w-[500px]'>
      <SearchBar />
      <div className='flex flex-wrap gap-1 mt-3'>
        {
          tags.map((item) => (
            <SearchTag tag={item} onRemove={onRemoveTag} key={item.id} />
          ))
        }
      </div>
    </div>
  );

  function onRemoveTag(id: string) {
    const newTags = tags.filter((item) => item.id !== id);
    setTags(newTags);
  }
}
