import TemplateItem from './item';

export default function TemplateList() {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-wrap gap-3 justify-center'>
        <TemplateItem />
        <TemplateItem />
        <TemplateItem />
        <TemplateItem />
        <TemplateItem />
      </div>
    </div>
  );
}
