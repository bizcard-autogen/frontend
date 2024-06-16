'use client';

import CardPreview from '@/components/card/preview';
import CardUserInput from '@/components/card/userinput';
import { db } from '@/utils/firebase';
import { CardPreviewKind, CardPreviewUtils, SvgSet } from '@/utils/preview';
import { Template } from '@/utils/template';
import * as firestore from 'firebase/firestore';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CreateTemplate() {
  const { tid } = useParams();
  const [template, setTemplate] = useState<Template>();
  const svgSet = useRef<SvgSet | null>(null);
  const hasUpdatedTemplate = useRef(false);

  useEffect(() => {
    if (hasUpdatedTemplate.current) {
      return;
    }
    hasUpdatedTemplate.current = true;
    updateTemplate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex justify-center gap-10 my-10'>
      <div className='flex flex-col gap-5'>
        <CardUserInput required title='肩書１（組織名・職業）' placeholder='フリーランス' />
        <CardUserInput required={false} title='肩書２（役職）' placeholder='フリーランス' />
      </div>
      <div className='flex flex-col gap-8'>
        <CardPreview kind={CardPreviewKind.Front} title='表デザイン' />
        <CardPreview kind={CardPreviewKind.Back} title='裏デザイン' />
      </div>
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
    svgSet.current = CardPreviewUtils.initializeAll(newTemplate);

    CardPreviewUtils.drawMaterial(svgSet.current.front, newTemplate, CardPreviewKind.Front)
    CardPreviewUtils.drawText(svgSet.current, CardPreviewKind.Front, {
      text: '名刺　太郎',
      x: 50,
      y: 65,
      fontFamily: 'serif',
      size: 20,
      bold: true,
    });
  }
}
