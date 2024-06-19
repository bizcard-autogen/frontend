import { CardPreviewSide, CardPreviewUtils, SvgSet } from '@/utils/preview';
import Button from '../button';
import { DownloadUtils } from '@/utils/download';
import DownloadFormat from './format';

export type DownloadProps = {
  svgSet?: SvgSet,
  visible: boolean,
  onClose?: () => void,
};

export default function Download(props: DownloadProps) {
  if (!props.visible || !props.svgSet) {
    return;
  }

  return (
    <div className='bg-[#33333388] flex items-center justify-center absolute top-0 left-0 h-[100vh] w-[100vw]'>
      <div className='bg-white inline-flex flex-col items-center gap-8 p-4'>
        <div className='flex justify-center gap-4'>
          <DownloadFormat title='PNG' download={(side) => download('image/png', side, side + '.png')} />
          <DownloadFormat title='JPG' download={(side) => download('image/jpg', side, side + '.jpg')} />
        </div>
        <span>
          <Button text='閉じる' dimColor onClick={props.onClose} />
        </span>
      </div>
    </div>
  );

  async function download(type: string, side: CardPreviewSide, filename: string) {
    if (!props.svgSet || !props.visible) {
      return;
    }
    const svg = CardPreviewUtils.selectSvg(props.svgSet, side);
    const url = await DownloadUtils.getDownloadUrl(type, svg.svg());
    DownloadUtils.downloadUrl(filename, url);
  }
}
