import { useState } from 'react';
import SearchTagSelector from './tagselector/selector';
import { Tag } from '@/utils/tag';

export type SearchBarProps = {
  onSelectTag: (tag: Tag) => void,
};

export default function SearchBar(props: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  return (
    <>
    <input
      className='bg-faded rounded-md p-2 outline-none w-full'
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
      placeholder='タグで検索する'
    />
    <SearchTagSelector keyword={keyword} onSelect={onSelectTag} />
    </>
  );

  function onSelectTag(tag: Tag) {
    props.onSelectTag(tag);
    setKeyword('');
  }
}
