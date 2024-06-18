import { SvgSet } from './preview';

export namespace DownloadUtils {
  export function downloadUrl(filename: string, url: string) {
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    a.click();
  }

  export async function getAllDownloadUrl(type: string, svgSet: SvgSet): Promise<[string, string]> {
    const frontUrl = await getDownloadUrl(type, svgSet.front.svg());
    const backUrl = await getDownloadUrl(type, svgSet.back.svg());
    return [frontUrl, backUrl];
  }

  function getDownloadUrl(type: string, svg: string): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      // 91x55mm with 600dpi
      const height = 1299;
      const width = 2150;
      canvas.setAttribute('height', height.toString());
      canvas.setAttribute('width', width.toString());
      const ctx = canvas.getContext('2d')!;

      const img = document.createElement('img');
      img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, width, height);
        const url = canvas.toDataURL(type);
        resolve(url);
      });
      const imgUrl = getSvgBlobUrl(svg);
      img.src = imgUrl;
    });
  }

  function getSvgBlobUrl(svg: string) {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }
}
