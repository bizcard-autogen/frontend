'use client';

import Button from '@/components/button';
import CardPreview from '@/components/card/preview';
import Input from '@/components/input';
import Download from '@/components/download/download';
import { CardPreviewSide, CardPreviewUtils } from '@/utils/preview';
import { Template } from '@/utils/template';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingIcon from '@/icons/loading';

export default function CreatePage() {
  const { tid } = useParams();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template>();
  const hasUpdatedTemplate = useRef(false);
  const [downloadVisible, setDownloadVisible] = useState(false);

  useEffect(() => {
    if (hasUpdatedTemplate.current) {
      return;
    }
    hasUpdatedTemplate.current = true;
    Template.fetch(tid as string).then((newTemplate) => {
      if (newTemplate) {
        setTemplate(newTemplate);
        setLoading(false);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !template) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-50px)]'>
        <LoadingIcon scale={0.5} opacity={0.4} />
      </div>
    );
  }

  return (
    <>
    <div className='flex justify-center gap-10 py-10 h-[calc(100vh-50px)]'>
      <div className='flex flex-col items-center gap-5 overflow-scroll scrollbar-none'>
        {
          template.elements.map((item) => (
            <Input
              title={item.title}
              placeholder='' // fix
              onChange={(text) => CardPreviewUtils.changeTextAll(item.id, text)} // fix
              key={item.id}
            />
          ))
        }
        <Button text='ダウンロード' onClick={() => setDownloadVisible(true)} />
      </div>
      <div className='flex flex-col gap-8 overflow-scroll scrollbar-none'>
        {
          template && (
            <>
            {/* todo: onLoad を追加してロード前の操作を防ぐ */}
            <CardPreview
              side={CardPreviewSide.Front}
              title='表デザイン'
              templatePath={Template.getTemplatePath(template, CardPreviewSide.Front)}
            />
            <CardPreview
              side={CardPreviewSide.Back}
              title='裏デザイン'
              templatePath={Template.getTemplatePath(template, CardPreviewSide.Back)}
            />
            </>
          )
        }
      </div>
    </div>
    <Download
      visible={downloadVisible}
      onClose={() => setDownloadVisible(false)}
    />
    </>
  );
}
