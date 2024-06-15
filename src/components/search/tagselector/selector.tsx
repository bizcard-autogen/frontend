import { Tag } from '@/utils/tag';
import { useEffect, useState } from 'react';
import SearchTagSelectorItem from './item';
import * as firestore from 'firebase/firestore';
import { db } from '@/utils/firebase';

export type SearchTagSelectorProps = {
  keyword: string,
  visible: boolean,
  onSelect: (tag: Tag) => void,
};

export default function SearchTagSelector(props: SearchTagSelectorProps) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [defaultTags, setDefaultTags] = useState<Tag[]>([]);
  const [visibleTags, setVisibleTags] = useState<Tag[]>([]);

  useEffect(() => {
    updateDefaultTags();
    updateAllTags();
  }, []);

  useEffect(() => {
    if (!props.keyword) {
      setVisibleTags(defaultTags);
    } else {
      const newTags = allTags.filter((item) => item.text.includes(props.keyword));
      setVisibleTags(newTags);
    }
  }, [allTags, defaultTags, props.keyword]);

  if (!props.visible) {
    return;
  }

  let tagElems = visibleTags.length
    ? (
      visibleTags.map((item) => (
        <SearchTagSelectorItem tag={item} onSelect={props.onSelect} key={item.id} />
      ))
    )
    : (
      <div className='px-2 py-1'>
        結果がありませんでした
      </div>
    );

  return (
    <div className='bg-white border border-faded absolute flex flex-col mt-11 w-1/2 max-w-[500px]'>
      {tagElems}
    </div>
  );

  async function updateDefaultTags() {
    const newTags: Tag[] = [];
    const defaultDocRef = firestore.doc(db, 'props', 'searchBarDefault');
    const defaultDoc = await firestore.getDoc(defaultDocRef);
    const newDefaultTags = defaultDoc.data()!.tags;
    newDefaultTags.forEach(async (tagDocRef: firestore.DocumentReference) => {
      const tagDoc = await firestore.getDoc(tagDocRef);
      if (!tagDoc.exists()) {
        return;
      }
      const converted = Tag.fromFirestore(tagDoc.id, tagDoc.data());
      newTags.push(converted);
    });
    setDefaultTags(newTags);
  }

  async function updateAllTags() {
    const newTags: Tag[] = [];
    const tagsCollectionRef = firestore.collection(db, 'tags');
    const tagsDoc = await firestore.getDocs(tagsCollectionRef);
    tagsDoc.docs.forEach((snapshot) => {
      const converted = Tag.fromFirestore(snapshot.id, snapshot.data());
      newTags.push(converted);
    });
    setAllTags(newTags);
  }
}
