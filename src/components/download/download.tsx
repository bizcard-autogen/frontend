import { SvgSet } from '@/utils/preview';
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
          <Button text='PNG' onClick={() => download('image/png')} />
          <Button text='JPG' onClick={() => download('image/jpg')} />
          <Button text='閉じる' onClick={props.onClose} />
        </div>
      </div>
    </div>
  );

  async function download(type: string) {
    if (!props.svgSet || !props.visible) {
      return;
    }
    // fix
    const [frontUrl, backUrl] = await DownloadUtils.getAllDownloadUrl(type, props.svgSet);
    DownloadUtils.downloadUrl('test.png', frontUrl);
  }
}
