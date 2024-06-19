import { useCallback, useEffect, useState } from 'react';
import { TemplateElement } from '@/utils/template';

export type CardManagerProps = {
  elements?: TemplateElement[],
  onChangeElements?: (elements: TemplateElement[]) => void,
};

export default function CardManager(props: CardManagerProps) {
  const [visible, setVisible] = useState(false);
  const [elementsText, setElementsText] = useState('');
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
      if (visible && props.onChangeElements) {
        const json = JSON.parse(elementsText);
        props.onChangeElements(json);
      }
      setVisible((state) => !state);
    }
  }, [visible, props, elementsText]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (props.elements) {
      const json = JSON.stringify(props.elements);
      setElementsText(json);
    }
  }, [props.elements]);

  if (!visible || !props.elements) {
    return;
  }

  return (
    <div className='bg-[#33333388] flex items-center justify-center absolute top-0 left-0 h-[100vh] w-[100vw]'>
      <div className='bg-white inline-flex flex-col p-4 h-2/3 w-2/3'>
        <textarea
          className='bg-faded outline-none p-2 h-full'
          value={elementsText}
          onChange={(event) => setElementsText(event.target.value)}
        />
      </div>
    </div>
  );
}
