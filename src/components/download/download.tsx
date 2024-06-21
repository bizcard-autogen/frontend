import { CardPreviewSide, CardPreviewUtils } from '@/utils/preview';
import Button from '../button';
import { DownloadUtils } from '@/utils/download';
import DownloadFormat from './format';
import Link from 'next/link';

export type DownloadProps = {
  visible: boolean,
  onClose?: () => void,
};

export default function Download(props: DownloadProps) {
  if (!props.visible) {
    return;
  }

  return (
    <div className='bg-[#33333388] flex items-center justify-center absolute top-0 left-0 h-[100vh] w-[100vw]'>
      <div className='bg-white inline-flex flex-col items-center p-4'>
        <div className='text-main text-sm underline mb-4'>
          <Link href='/rules' target='_blank'>
            利用ルールをご確認ください
          </Link>
        </div>
        <div className='flex justify-center gap-4'>
          <DownloadFormat title='PNG' download={(side) => download('image/png', side, side + '.png')} />
          <DownloadFormat title='JPG' download={(side) => download('image/jpg', side, side + '.jpg')} />
        </div>
        <div className='mt-8'>
          <Button text='閉じる' dimColor onClick={props.onClose} />
        </div>
      </div>
    </div>
  );

  async function download(type: string, side: CardPreviewSide, filename: string) {
    if (!props.visible) {
      return;
    }
    const svg = CardPreviewUtils.getSvgString(side);
    if (!svg) {
      return;
    }
    const url = await DownloadUtils.getDownloadUrl(type, svg);
    DownloadUtils.downloadUrl(filename, url);
  }
}
