import CloseIcon from '@/icons/close';
import { Tag } from '@/utils/tag';

export type SearchTagProps = {
  tag: Tag,
  onRemove: (id: string) => void,
};

export default function SearchTag(props: SearchTagProps) {
  return (
    <div
      className='bg-main hover:bg-ltmain transition-colors text-white cursor-pointer rounded-md flex items-center gap-2 px-2 py-1/2 select-none'
      onClick={() => props.onRemove(props.tag.id)}
    >
      {props.tag.text}
      <CloseIcon size={10} />
    </div>
  );
}
