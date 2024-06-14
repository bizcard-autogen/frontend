import { Tag } from '@/utils/tag';
import { useState } from 'react';
import SearchTagSelectorItem from './item';

export type SearchTagSelectorProps = {
  keyword: string,
  onSelect: (tag: Tag) => void,
};

export default function SearchTagSelector(props: SearchTagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([
    { id: '0', text: 'かっこいい' },
    { id: '1', text: 'シンプル' },
    { id: '2', text: 'スタイリッシュ' },
  ]);

  if (!props.keyword.length) {
    return;
  }

  return (
    <div className='bg-white border border-faded absolute flex flex-col mt-11 w-1/2 max-w-[500px]'>
      {
        tags.map((item) => (
          <SearchTagSelectorItem tag={item} onSelect={props.onSelect} key={item.id} />
        ))
      }
    </div>
  );
}
