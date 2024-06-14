import { useEffect, useState } from 'react';
import SearchTagSelector from './tagselector/selector';
import { Tag } from '@/utils/tag';

export type SearchBarProps = {
  onSelectTag: (tag: Tag) => void,
};

export default function SearchBar(props: SearchBarProps) {
  const [keyword, setKeyword] = useState('');
  const [tagSelectorVisible, setTagSelectorVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <>
    <input
      className='bg-faded rounded-md p-2 outline-none w-full'
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
      onFocus={() => setTagSelectorVisible(true)}
      onBlur={() => setTagSelectorVisible(false)}
      placeholder='タグで検索する'
    />
    <SearchTagSelector keyword={keyword} visible={tagSelectorVisible} onSelect={onSelectTag} />
    </>
  );

  function onMouseDown(event: MouseEvent) {
    const isItem = (event.target as HTMLElement).id.startsWith('searchTagSelectorItem_');
    if (isItem) {
      event.preventDefault();
    }
  }

  function onSelectTag(tag: Tag) {
    props.onSelectTag(tag);
    setKeyword('');
    setTagSelectorVisible(false);
  }
}
