'use client';

import Button from '@/components/button';
import CardPreview from '@/components/card/preview';
import CardUserInput from '@/components/card/userinput';
import CardManager from '@/components/cardman/cardman';
import Download from '@/components/download/download';
import { db } from '@/utils/firebase';
import { CardPreviewSide, CardPreviewUtils, SvgModifier, SvgSet } from '@/utils/preview';
import { Template, TemplateElement, TextTemplateLayout } from '@/utils/template';
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
    fetchTemplate().then((newTemplate) => {
      if (newTemplate) {
        updateTemplate(newTemplate);
      }
    });
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
      <div className='flex flex-col gap-8 overflow-scroll scrollbar-none'>
        <CardPreview side={CardPreviewSide.Front} title='表デザイン' />
        <CardPreview side={CardPreviewSide.Back} title='裏デザイン' />
      </div>
    </div>
    <CardManager elements={template?.elements} onChangeElements={onChangeElements} />
    <Download
      svgSet={svgSet.current ?? undefined}
      visible={downloadVisible}
      onClose={() => setDownloadVisible(false)}
    />
    </>
  );

  async function fetchTemplate(): Promise<Template | null> {
    const templateDocRef = firestore.doc(db, 'templates', tid as string);
    const templateDoc = await firestore.getDoc(templateDocRef);
    if (!templateDoc.exists()) {
      return null;
    }
    return Template.fromFirestore(templateDoc.id, templateDoc.data());
  }

  async function updateTemplate(newTemplate: Template) {
    setTemplate(newTemplate);
    svgSet.current = CardPreviewUtils.initializeAll(newTemplate);

    await CardPreviewUtils.drawMaterial(svgSet.current.front, newTemplate, CardPreviewSide.Front);
    newTemplate.elements.forEach((item) => {
      svgModifiers.current[item.id] = CardPreviewUtils.drawText(svgSet.current!, item.side, item.layout, '')
    });
  }

  function onChangeElements(elements: TemplateElement[]) {
    const newTemplate = Object.assign({}, template);
    newTemplate.elements = elements;
    updateTemplate(newTemplate);
  }
}
