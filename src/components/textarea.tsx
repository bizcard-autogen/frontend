import { ChangeEvent } from 'react';

export type TextAreaProps = {
  title?: string,
  text: string,
  placeholder?: string,
  onChange?: (text: string) => void,
};

export default function TextArea(props: TextAreaProps) {
  return (
    <div className='flex flex-col'>
      {
        props.title && (
          <div className='text-sm text-main font-bold ml-3 mb-1'>
            {props.title}
          </div>
        )
      }
      <textarea
        className='bg-faded rounded-lg outline-none resize-none scrollbar-none px-3 py-2 h-[275px] w-[300px]'
        value={props.text}
        placeholder={props.placeholder}
        onChange={onChangeText}
      />
    </div>
  );

  function onChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  }
}
