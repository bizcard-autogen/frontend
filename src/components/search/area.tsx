import { useState } from 'react';
import SearchBar from './bar';
import SearchTag from './tag';
import { Tag } from '@/utils/tag';

export default function SearchArea() {
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <div className='flex flex-col w-1/2 max-w-[500px]'>
      <SearchBar onSelectTag={onSelectTag} />
      <div className='flex flex-wrap gap-1 mt-3'>
        {
          tags.map((item) => (
            <SearchTag tag={item} onRemove={onRemoveTag} key={item.id} />
          ))
        }
      </div>
    </div>
  );

  function onSelectTag(tag: Tag) {
    const hasTag = tags.findIndex((item) => item.id === tag.id) !== -1;
    if (!hasTag) {
      const newTags = [...tags, tag];
      setTags(newTags);
    }
  }

  function onRemoveTag(id: string) {
    const newTags = tags.filter((item) => item.id !== id);
    setTags(newTags);
  }
}
