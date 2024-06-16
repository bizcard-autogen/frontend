import { CardPreviewKind } from '@/utils/preview';
import { useEffect, useRef } from 'react';

export type CardPreviewProps = {
  kind: CardPreviewKind,
  title: string,
};

export default function CardPreview(props: CardPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const svgWrapperId = 'cardPreview_' + props.kind;

  useEffect(() => {
    if (!previewRef.current) {
      return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex flex-col items-center'>
      <span>
        <span className='bg-main text-white text-sm rounded px-2 py-1'>
          {props.title}
        </span>
      </span>
      <div className='bg-faded mt-2 h-[207px] w-[343px] select-none' id={svgWrapperId} ref={previewRef}>
      </div>
    </div>
  );
}
