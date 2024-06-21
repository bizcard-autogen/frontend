import { Template } from '@/utils/template';
import Image from 'next/image';
import Link from 'next/link';

export type TemplateItemProps = {
  template: Template,
};

export default function TemplateItem(props: TemplateItemProps) {
  return (
    <Link href={'/create/' + props.template.id}>
      <div className='bg-faded h-[151px] w-[250px]'>
        <Image
          className='cursor-pointer select-none'
          src={Template.getThumbnailPath(props.template)}
          height={151}
          width={250}
          alt={props.template.id}
        />
      </div>
    </Link>
  );
}
