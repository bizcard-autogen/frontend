import * as firestore from 'firebase/firestore';
import { CardPreviewSide } from './preview';

export type Template = {
  id: string,
  elements: TemplateElement[],
};

export namespace Template {
  export function fromFirestore(id: string, data: firestore.DocumentData): Template {
    return {
      id,
      elements: data.elements,
    };
  }

  export function getTemplatePath(template: Template, side: CardPreviewSide): string {
    return `/templates/${template.id}/${side}.svg`;
  }

  export function getThumbnailPath(template: Template): string {
    return getTemplatePath(template, CardPreviewSide.Front);
  }
}

export type TemplateElement = {
  id: string,
  title: string,
};
