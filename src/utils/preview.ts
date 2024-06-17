import { SVG, Svg, Text } from '@svgdotjs/svg.js';
import { Template, TemplateLayout } from './template';

// todo: CardPreviewSide に改名
export enum CardPreviewKind {
  Front = 'front',
  Back = 'back',
}

export type SvgSet = {
  front: Svg,
  back: Svg,
};

export type SvgModifier = Text;

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

  export function drawText(svgSet: SvgSet, side: CardPreviewKind, layout: TemplateLayout, text: string): SvgModifier {
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
