'use client';

import CardPreview from '@/components/card/preview';
import CardUserInput from '@/components/card/userinput';
import { db } from '@/utils/firebase';
import { CardPreviewKind, CardPreviewUtils, SvgModifier, SvgSet } from '@/utils/preview';
import { Template, TextTemplateLayout } from '@/utils/template';
import { Text } from '@svgdotjs/svg.js';
import * as firestore from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CreateTemplate() {
  const { tid } = useParams();
  const [template, setTemplate] = useState<Template>();
  const svgSet = useRef<SvgSet | null>(null);
  const hasUpdatedTemplate = useRef(false);
  const svgModifiers = useRef<{ [id: string]: SvgModifier }>({});

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

    CardPreviewUtils.drawMaterial(svgSet.current.front, newTemplate, CardPreviewKind.Front);
    newTemplate.elements.forEach((item) => {
      svgModifiers.current[item.id] = CardPreviewUtils.drawText(svgSet.current!, item.side, item.layout, '')
    });
  }
}
