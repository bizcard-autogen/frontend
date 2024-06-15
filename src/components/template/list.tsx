import { useEffect, useState } from 'react';
import TemplateItem from './item';
import { Template } from '@/utils/template';
import * as firestore from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default function TemplateList() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    updateTemplates();
  }, []);

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

  async function updateTemplates() {
    const newTemplates: Template[] = [];
    const templatesCollectionRef = firestore.collection(db, 'templates');
    const templateDocsRef = await firestore.getDocs(templatesCollectionRef);
    templateDocsRef.docs.forEach(async (snapshot) => {
      const converted = Template.fromFirestore(snapshot.id, snapshot.data());
      newTemplates.push(converted);
    });
    setTemplates(newTemplates);
  }
}
