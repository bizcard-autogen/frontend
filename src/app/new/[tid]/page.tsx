'use client';

import { db } from '@/utils/firebase';
import { Template } from '@/utils/template';
import * as firestore from 'firebase/firestore';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function New() {
  const { tid } = useParams();
  const [template, setTemplate] = useState<Template>();

  useEffect(() => {
    updateTemplate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=''>
      {template?.name ?? tid}
    </div>
  );

  async function updateTemplate() {
    const templateDocRef = firestore.doc(db, 'templates', tid as string);
    const templateDoc = await firestore.getDoc(templateDocRef);
    if (!templateDoc.exists()) {
      return;
    }
    const newTemplate = Template.fromFirestore(templateDoc.id, templateDoc.data());
    setTemplate(newTemplate);
  }
}
