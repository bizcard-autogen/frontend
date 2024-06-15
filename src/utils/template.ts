import * as firestore from 'firebase/firestore';

export type Template = {
  id: string,
  name: string,
  thumbnailUrl: string,
};

export namespace Template {
  export function fromFirestore(id: string, data: firestore.DocumentData): Template {
    return {
      id,
      name: data.name,
      thumbnailUrl: data.thumbnailUrl,
    };
  }
}
