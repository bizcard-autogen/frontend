import { useState } from 'react';
import TemplateItem from './item';
import { Template } from '@/utils/template';

export default function TemplateList() {
  const [templates, setTemplates] = useState<Template[]>([
    { id: '0', name: '0000', thumbnailUrl: 'https://i.gyazo.com/b29ca8055b61a06ef25c198b164b5950.png' },
    { id: '1', name: '0001', thumbnailUrl: 'https://i.gyazo.com/b29ca8055b61a06ef25c198b164b5950.png' },
  ]);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-wrap gap-3 justify-center mx-3'>
        {
          templates.map((item) => (
            <TemplateItem template={item} key={item.id} />
          ))
        }
      </div>
    </div>
  );
}
