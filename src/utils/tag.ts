import * as firestore from 'firebase/firestore';

export type Tag = {
  id: string,
  text: string,
};

export namespace Tag {
  export function fromFirestore(id: string, data: firestore.DocumentData): Tag {
    return {
      id,
      text: data.text,
    };
  }
}
