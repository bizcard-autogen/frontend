import { Template } from '@/utils/template';
import { useEffect, useRef, useState } from 'react';
import AdminTemplateItem from './item';
import { useRouter } from 'next/navigation';

export default function AdminTemplateList() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const templateUpdated = useRef(false);

  useEffect(() => {
    if (templateUpdated.current) {
      return;
    }
    templateUpdated.current = true;
    fetchTemplates();
  }, []);

  return (
    <div className='bg-faded rounded-md'>
      {
        templates.map((item) => (
          <AdminTemplateItem
            template={item}
            onClick={(id) => router.push(`/admin/edit/${id}`)}
            key={item.id}
          />
        ))
      }
    </div>
  );

  async function fetchTemplates() {
    const newTemplates = await Template.fetchAll();
    setTemplates(newTemplates);
  }
}
