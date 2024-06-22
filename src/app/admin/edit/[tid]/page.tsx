'use client';

import Button from '@/components/button';
import TextArea from '@/components/textarea';
import { CardPreviewSide } from '@/utils/preview';
import { Template } from '@/utils/template';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function AdminEditPage() {
  const { tid } = useParams();
  const [template, setTemplate] = useState<Template>();
  const hasUpdatedTemplate = useRef(false);
  const [elementsText, setElementsText] = useState('');

  useEffect(() => {
    if (hasUpdatedTemplate.current) {
      return;
    }
    hasUpdatedTemplate.current = true;
    Template.fetch(tid as string).then((newTemplate) => {
      if (newTemplate) {
        updateTemplate(newTemplate);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex flex-col items-center gap-6 my-6'>
      <div className='flex gap-1'>
        {
          template && (
            <>
            <Image
              className='cursor-pointer select-none'
              src={Template.getTemplatePath(template, CardPreviewSide.Front)}
              height={151}
              width={250}
              alt={template.id}
            />
            <Image
              className='cursor-pointer select-none'
              src={Template.getTemplatePath(template, CardPreviewSide.Back)}
              height={151}
              width={250}
              alt={template.id}
            />
            </>
          )
        }
      </div>
      <TextArea
        title='要素リスト'
        text={elementsText}
        placeholder={'id/title\nid/title\n...'}
        onChange={(text) => setElementsText(text)}
      />
      <Button text='保存' onClick={saveChanges} />
    </div>
  );

  function updateTemplate(newTemplate: Template) {
    setTemplate(newTemplate);
    const newElementsText = newTemplate.elements.map((item) => item.id + '/' + item.title).join('\n');
    setElementsText(newElementsText);
  }

  function saveChanges() {
    if (!template) {
      return;
    }
    const newElements = elementsText
      .split('\n')
      .map((item) => {
        const tokens = item.split('/');
        return tokens.length == 2
          ? { id: tokens[0], title: tokens[1] }
          : { id: '', title: item };
      });
      console.log(newElements);
      const newTemplate = {
        id: template.id,
        elements: newElements,
      };
      Template.update(newTemplate)
        .then(() => alert('テンプレートを更新しました。'))
        .catch((err) => {
          alert('テンプレートの更新に失敗しました。');
          console.error(err);
        });
  }
}
