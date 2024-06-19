import * as firestore from 'firebase/firestore';
import { CardPreviewSide } from './preview';

export type Template = {
  id: string,
  name: string,
  thumbnailUrl: string,
  frontMaterialUrl: string,
  backMaterialUrl: string,
  elements: TemplateElement[],
};

export namespace Template {
  export function fromFirestore(id: string, data: firestore.DocumentData): Template {
    return {
      id,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
      frontMaterialUrl: data.frontMaterialUrl,
      backMaterialUrl: data.backMaterialUrl,
      elements: JSON.parse(data.elements).data,
    };
  }
}

export type TemplateElement = {
  id: string,
  title: string,
  side: CardPreviewSide,
  layout: TemplateLayout,
};

export enum TemplateKind {
  Text = 'text',
}

export type TemplateLayout = 
  | TextTemplateLayout;

export type TextTemplateLayout = {
  kind: TemplateKind.Text,
  placeholder: string,
  x: number,
  y: number,
  align?: TextAlign,
  fontFamily: string,
  fontSize: number,
  bold?: boolean,
};

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export namespace TextAlign {
  export function toAnchor(align?: TextAlign): string {
    switch (align) {
      case undefined:
        return 'start';

      case TextAlign.Left:
        return 'start';

      case TextAlign.Center:
        return 'middle';

      case TextAlign.Right:
        return 'end';
    }
  }
}
