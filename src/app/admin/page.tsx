'use client';

import AdminTemplateList from '@/components/admin/template/list';

export default function AdminPage() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-50px)]'>
      <AdminTemplateList />
    </div>
  );
}
