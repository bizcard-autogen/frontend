import { CardPreviewSide } from '@/utils/preview';
import Button from '../button';

export type DownloadFormatProps = {
  title: string,
  download: (side: CardPreviewSide) => void,
};

export default function DownloadFormat(props: DownloadFormatProps) {
  return (
    <div className='flex flex-col'>
      <div className='text-main text-sm text-center font-bold mb-1'>
        {props.title}
      </div>
      <div className='flex gap-2'>
        <Button text='表面' onClick={() => props.download(CardPreviewSide.Front)} />
        <Button text='裏面' onClick={() => props.download(CardPreviewSide.Back)} />
      </div>
    </div>
  );
}
