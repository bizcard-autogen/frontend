import { SVG, Svg } from '@svgdotjs/svg.js';
import { Template } from './template';

export enum CardPreviewKind {
  Front = 'front',
  Back = 'back',
}

export type SvgSet = {
  front: Svg,
  back: Svg,
};

export type SvgTextOptions = {
  text: string,
  x: number,
  y: number,
  fontFamily: string,
  fontSize: number,
  bold?: boolean,
};

export namespace CardPreviewUtils {
  function initialize(template: Template, kind: CardPreviewKind): Svg {
    const selector = '#cardPreview_' + kind;
    const svg = SVG().addTo(selector).size(343, 207);
    drawMaterial(svg, template, kind);
    return svg;
  }

  export function initializeAll(template: Template): SvgSet {
    return {
      front: initialize(template, CardPreviewKind.Front),
      back: initialize(template, CardPreviewKind.Back),
    };
  }

  function selectSvg(svgSet: SvgSet, kind: CardPreviewKind): Svg {
    switch (kind) {
      case CardPreviewKind.Front:
        return svgSet.front;

      case CardPreviewKind.Back:
        return svgSet.back;
    }
  }

  export function drawMaterial(svg: Svg, template: Template, kind: CardPreviewKind) {
    let materialUrl;
    switch (kind) {
      case CardPreviewKind.Front:
        materialUrl = template.frontMaterialUrl;
        break;

      case CardPreviewKind.Back:
        materialUrl = template.backMaterialUrl;
        break;
    }
    svg.image().load(materialUrl).size(343, 207);
  }

  export function drawText(svgSet: SvgSet, kind: CardPreviewKind, options: SvgTextOptions) {
    const svg = selectSvg(svgSet, kind);
    const text = svg
      .text(options.text)
      .move(options.x, options.y)
      .font('family', options.fontFamily)
      .font('size', options.fontSize)
    if (options.bold) {
      text.font('weight', 'bold');
    }
  }
}
