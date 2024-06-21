import { CardPreviewUtils } from './preview';

export namespace DownloadUtils {
  export function downloadUrl(filename: string, url: string) {
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    a.click();
  }

  export function getDownloadUrl(type: string, svg: string): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const height = CardPreviewUtils.canvasHeight;
      const width = CardPreviewUtils.canvasWidth;
      canvas.height = height;
      canvas.width = width;
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

  export function getSvgBlobUrl(svg: string) {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }

  export function getDataUrlFromImage(type: string, url: string, dimensions?: [number, number]): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        const height = dimensions?.[0] ?? img.height;
        const width = dimensions?.[1] ?? img.width;
        canvas.height = height;
        canvas.width = width;
        ctx.drawImage(img, 0, 0, width, height);
        const base64 = canvas.toDataURL(type);
        resolve(base64);
      });
      img.src = url;
    });
  }
}
