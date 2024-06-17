'use client';

import CardPreview from '@/components/card/preview';
import CardUserInput from '@/components/card/userinput';
import { db } from '@/utils/firebase';
import { CardPreviewKind, CardPreviewUtils, SvgSet } from '@/utils/preview';
import { Template } from '@/utils/template';
import { Text } from '@svgdotjs/svg.js';
import * as firestore from 'firebase/firestore';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CreateTemplate() {
  const { tid } = useParams();
  const [template, setTemplate] = useState<Template>();
  const svgSet = useRef<SvgSet | null>(null);
  const hasUpdatedTemplate = useRef(false);
  const role1Ref = useRef<Text | null>(null);

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
        <CardUserInput
          required
          title='肩書１（組織名・職業）'
          placeholder='フリーランス'
          onChange={(text) => CardPreviewUtils.changeText(role1Ref.current!, text)}
        />
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
    role1Ref.current = CardPreviewUtils.drawText(svgSet.current, CardPreviewKind.Front, {
      text: 'ABC株式会社',
      x: 50,
      y: 23,
      fontFamily: 'Zen Maru Gothic',
      fontSize: 9,
      bold: true,
    });
    CardPreviewUtils.drawText(svgSet.current, CardPreviewKind.Front, {
      text: '代表取締役',
      x: 50,
      y: 35,
      fontFamily: 'Zen Maru Gothic',
      fontSize: 9,
      bold: true,
    });
    CardPreviewUtils.drawText(svgSet.current, CardPreviewKind.Front, {
      text: '名刺　太郎',
      x: 50,
      y: 60,
      fontFamily: 'Zen Maru Gothic',
      fontSize: 20,
      bold: true,
    });
    CardPreviewUtils.drawText(svgSet.current, CardPreviewKind.Front, {
      text: 'Taro Meishi',
      x: 50,
      y: 75,
      fontFamily: 'Zen Maru Gothic',
      fontSize: 10,
      bold: true,
    });
  }
}
