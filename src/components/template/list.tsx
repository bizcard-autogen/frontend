import { useEffect, useRef, useState } from 'react';
import TemplateItem from './item';
import { Template } from '@/utils/template';
import LoadingIcon from '@/icons/loading';

export default function TemplateList() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const templateUpdated = useRef(false);

  useEffect(() => {
    if (templateUpdated.current) {
      return;
    }
    templateUpdated.current = true;
    fetchTemplates();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-wrap gap-3 justify-center mx-3'>
        {loading && <LoadingIcon scale={0.5} opacity={0.4} />}
        {
          templates.map((item) => (
            <TemplateItem template={item} key={item.id} />
          ))
        }
      </div>
    </div>
  );

  async function fetchTemplates() {
    const newTemplates = await Template.fetchAll();
    setTemplates(newTemplates);
    setLoading(false);
  }
}
