export enum CardPreviewSide {
  Front = 'front',
  Back = 'back',
}

export namespace CardPreviewUtils {
  // 91x55mm with 600dpi
  export const canvasHeight = 1299;
  export const canvasWidth = 2150;

  export function getSvgObjectElementId(side: CardPreviewSide): string {
    return 'cardPreview_' + side;
  }

  export function getSvgDocument(side: CardPreviewSide): Document | null {
    const object = document.getElementById(getSvgObjectElementId(side));
    if (!object) {
      return null;
    }
    return (object as HTMLObjectElement).getSVGDocument();
  }

  export function getSvgString(side: CardPreviewSide): string | null {
    const svgDoc = CardPreviewUtils.getSvgDocument(side);
    if (!svgDoc) {
      return null;
    }
    return new XMLSerializer().serializeToString(svgDoc.documentElement);
  }

  export function changeTextAll(elementId: string, text: string) {
    changeText(CardPreviewSide.Front, elementId, text);
    changeText(CardPreviewSide.Back, elementId, text);
  }

  function changeText(side: CardPreviewSide, elementId: string, text: string) {
    const svg = getSvgDocument(side);
    if (!svg) {
      return null;
    }
    const tspan = svg.getElementById(elementId);
    if (!tspan) {
      return;
    }
    tspan.textContent = text;
  }
}
