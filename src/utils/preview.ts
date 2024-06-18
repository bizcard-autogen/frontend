import { SVG, Svg, Text } from '@svgdotjs/svg.js';
import { Template, TemplateLayout } from './template';

export enum CardPreviewSide {
  Front = 'front',
  Back = 'back',
}

export type SvgSet = {
  front: Svg,
  back: Svg,
};

export type SvgModifier = Text;

export namespace CardPreviewUtils {
  function initialize(template: Template, side: CardPreviewSide): Svg {
    const selector = '#cardPreview_' + side;
    const svg = SVG().addTo(selector).size(343, 207);
    drawMaterial(svg, template, side);
    return svg;
  }

  export function initializeAll(template: Template): SvgSet {
    return {
      front: initialize(template, CardPreviewSide.Front),
      back: initialize(template, CardPreviewSide.Back),
    };
  }

  function selectSvg(svgSet: SvgSet, side: CardPreviewSide): Svg {
    switch (side) {
      case CardPreviewSide.Front:
        return svgSet.front;

      case CardPreviewSide.Back:
        return svgSet.back;
    }
  }

  export async function drawMaterial(svg: Svg, template: Template, side: CardPreviewSide) {
    let materialUrl;
    switch (side) {
      case CardPreviewSide.Front:
        materialUrl = template.frontMaterialUrl;
        break;

      case CardPreviewSide.Back:
        materialUrl = template.backMaterialUrl;
        break;
    }
    const base64 = await getDataUrlFromImage(materialUrl);
    svg.image().load(base64).size(343, 207);
  }

  export function getDataUrlFromImage(url: string): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/png');
        resolve(base64);
      });
      img.src = url;
    });
  }

  export function drawText(svgSet: SvgSet, side: CardPreviewSide, layout: TemplateLayout, text: string): SvgModifier {
    const svg = selectSvg(svgSet, side);
    const modifier = svg
      .text(text)
      .move(layout.x, layout.y)
      .font('family', layout.fontFamily)
      .font('size', layout.fontSize)
    if (layout.bold) {
      modifier.font('weight', 'bold');
    }
    return modifier;
  }

  export function changeText(text: Text, to: string) {
    text.text(to);
  }
}
