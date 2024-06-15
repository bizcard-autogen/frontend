import { Template } from '@/utils/template';
import Image from 'next/image';

export type TemplateItemProps = {
  template: Template,
};

export default function TemplateItem(props: TemplateItemProps) {
  return (
    <div className='bg-faded h-[151px] w-[250px]'>
      <Image
        className='cursor-pointer select-none'
        src={props.template.thumbnailUrl}
        height={151}
        width={250}
        alt={props.template.name}
      />
    </div>
  );
}
