import { CardPreviewSide, CardPreviewUtils } from '@/utils/preview';

export type CardPreviewProps = {
  side: CardPreviewSide,
  title: string,
  templatePath: string,
  onLoad?: () => void,
};

export default function CardPreview(props: CardPreviewProps) {

  return (
    <div className='flex flex-col items-center'>
      <span>
        <span className='bg-main text-white text-sm rounded px-2 py-1'>
          {props.title}
        </span>
      </span>
      <div className='bg-faded mt-2 h-[207px] w-[343px] select-none'>
        <object
          id={CardPreviewUtils.getSvgObjectElementId(props.side)}
          type="image/svg+xml"
          data={props.templatePath}
          onLoad={props.onLoad}
        />
      </div>
    </div>
  );
}
