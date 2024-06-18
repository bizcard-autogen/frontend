import { SVG, Svg, Text } from '@svgdotjs/svg.js';
import { Template, TemplateLayout } from './template';
import { DownloadUtils } from './download';

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
  // 91x55mm with 600dpi
  export const canvasHeight = 1299;
  export const canvasWidth = 2150;

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

  export function selectSvg(svgSet: SvgSet, side: CardPreviewSide): Svg {
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
    const base64 = await DownloadUtils.getDataUrlFromImage('image/png', materialUrl);
    svg.image().load(base64).size(343, 207);
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
