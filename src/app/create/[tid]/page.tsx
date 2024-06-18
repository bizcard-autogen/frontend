'use client';

import Button from '@/components/button';
import CardPreview from '@/components/card/preview';
import CardUserInput from '@/components/card/userinput';
import Download from '@/components/download/download';
import { db } from '@/utils/firebase';
import { CardPreviewSide, CardPreviewUtils, SvgModifier, SvgSet } from '@/utils/preview';
import { Template, TextTemplateLayout } from '@/utils/template';
import * as firestore from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CreateTemplate() {
  const { tid } = useParams();
  const [template, setTemplate] = useState<Template>();
  const svgSet = useRef<SvgSet | null>(null);
  const hasUpdatedTemplate = useRef(false);
  const svgModifiers = useRef<{ [id: string]: SvgModifier }>({});
  const [downloadVisible, setDownloadVisible] = useState(false);

  useEffect(() => {
    if (hasUpdatedTemplate.current) {
      return;
    }
    hasUpdatedTemplate.current = true;
    updateTemplate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <div className='flex justify-center gap-10 py-10 h-[calc(100vh-50px)]'>
      <div className='flex flex-col items-center gap-5 overflow-scroll scrollbar-none'>
        {
          template && (
            template.elements.map((item) => (
              <CardUserInput
                title={item.title}
                // fix: casting
                placeholder={(item.layout as TextTemplateLayout).placeholder}
                onChange={(text) => CardPreviewUtils.changeText(svgModifiers.current![item.id], text)}
                key={item.id}
              />
            ))
          )
        }
        <Button text='ダウンロード' onClick={() => setDownloadVisible(true)} />
      </div>
      <div className='flex flex-col gap-8'>
        <CardPreview side={CardPreviewSide.Front} title='表デザイン' />
        <CardPreview side={CardPreviewSide.Back} title='裏デザイン' />
      </div>
    </div>
    <Download
      svgSet={svgSet.current ?? undefined}
      visible={downloadVisible}
      onClose={() => setDownloadVisible(false)}
    />
    </>
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

    await CardPreviewUtils.drawMaterial(svgSet.current.front, newTemplate, CardPreviewSide.Front);
    newTemplate.elements.forEach((item) => {
      svgModifiers.current[item.id] = CardPreviewUtils.drawText(svgSet.current!, item.side, item.layout, '')
    });
  }
}
