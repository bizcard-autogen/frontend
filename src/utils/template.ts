import * as firestore from 'firebase/firestore';
import { CardPreviewKind } from './preview';

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
  side: CardPreviewKind,
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
  fontFamily: string,
  fontSize: number,
  bold?: boolean,
};
