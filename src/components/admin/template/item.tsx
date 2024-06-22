import { CardPreviewSide } from '@/utils/preview';
import { Template } from '@/utils/template';
import Image from 'next/image';

export type AdminTemplateItemProps = {
  template: Template,
  onClick?: (id: string) => void,
};

export default function AdminTemplateItem(props: AdminTemplateItemProps) {
  return (
    <div
      className='flex gap-2 p-2 cursor-pointer'
      onClick={onClick}
    >
      <div className='flex gap-1'>
        <Image
          className='cursor-pointer select-none'
          src={Template.getTemplatePath(props.template, CardPreviewSide.Front)}
          height={151 / 2}
          width={250 / 2}
          alt={props.template.id}
        />
        <Image
          className='cursor-pointer select-none'
          src={Template.getTemplatePath(props.template, CardPreviewSide.Back)}
          height={151 / 2}
          width={250 / 2}
          alt={props.template.id}
        />
      </div>
      <div className='flex flex-col w-[300px]'>
        <span className='text-gray text-sm'>
          {`ID: ${props.template.id}`}
        </span>
        {/* fix */}
        <span>タグ１ タグ２ タグ３ ...</span>
      </div>
    </div>
  );

  function onClick() {
    if (props.onClick) {
      props.onClick(props.template.id);
    }
  }
}
