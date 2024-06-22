import * as firestore from 'firebase/firestore';
import { CardPreviewSide } from './preview';
import { db } from './firebase';

export type Template = {
  id: string,
  elements: TemplateElement[],
};

export namespace Template {
  export async function fetchAll(): Promise<Template[]> {
    const templates: Template[] = [];
    const templatesCollectionRef = firestore.collection(db, 'templates');
    const templateDocsRef = await firestore.getDocs(templatesCollectionRef);
    templateDocsRef.docs.forEach(async (snapshot) => {
      const converted = fromFirestore(snapshot.id, snapshot.data());
      templates.push(converted);
    });
    return templates;
  }

  export async function fetch(templateId: string): Promise<Template | null> {
    const templateDocRef = firestore.doc(db, 'templates', templateId);
    const templateDoc = await firestore.getDoc(templateDocRef);
    if (!templateDoc.exists()) {
      return null;
    }
    return fromFirestore(templateDoc.id, templateDoc.data());
  }

  export async function update(template: Template): Promise<void> {
    const templateDocRef = firestore.doc(db, 'templates', template.id);
    await firestore.setDoc(templateDocRef, template);
  }

  function fromFirestore(id: string, data: firestore.DocumentData): Template {
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
