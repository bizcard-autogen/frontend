import { Tag } from '@/utils/tag';

export type SearchTagSelectorItemProps = {
  tag: Tag,
  onSelect: (tag: Tag) => void,
};

export default function SearchTagSelectorItem(props: SearchTagSelectorItemProps) {
  return (
    <div
      className='hover:bg-faded transition-colors cursor-pointer px-2 py-1'
      id={'searchTagSelectorItem_' + props.tag.id}
      onClick={() => props.onSelect(props.tag)}
    >
      {props.tag.text}
    </div>
  );
}
