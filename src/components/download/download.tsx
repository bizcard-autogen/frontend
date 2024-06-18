import { CardPreviewSide, CardPreviewUtils, SvgSet } from '@/utils/preview';
import Button from '../button';
import { DownloadUtils } from '@/utils/download';

export type DownloadProps = {
  svgSet?: SvgSet,
  visible: boolean,
  onClose?: () => void,
};

export default function Download(props: DownloadProps) {
  return (
    <div
      className='bg-[#33333388] flex items-center justify-center absolute top-0 left-0 h-[100vh] w-[100vw]'
      style={{ display: props.visible && props.svgSet ? undefined : 'none' }}
    >
      <div className='bg-white inline-block p-4'>
        <div className='flex justify-center gap-4 w-64'>
          <Button text='PNG表' onClick={() => download('image/png', CardPreviewSide.Front, 'front.png')} />
          <Button text='PNG裏' onClick={() => download('image/png', CardPreviewSide.Back, 'back.png')} />
          <Button text='JPG表' onClick={() => download('image/jpg', CardPreviewSide.Front, 'front.jpg')} />
          <Button text='JPG裏' onClick={() => download('image/jpg', CardPreviewSide.Back, 'back.jpg')} />
          <Button text='閉じる' onClick={props.onClose} />
        </div>
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
