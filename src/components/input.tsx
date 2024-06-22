import { ChangeEvent } from 'react';

export type InputProps = {
  title?: string,
  placeholder?: string,
  onChange?: (text: string) => void,
};

export default function Input(props: InputProps) {
  return (
    <div className='flex flex-col'>
      {
        props.title && (
          <div className='text-sm text-main font-bold ml-3 mb-1'>
            {props.title}
          </div>
        )
      }
      <input
        className='bg-faded rounded-lg outline-none px-3 py-2 w-[300px]'
        type='text'
        placeholder={props.placeholder}
        onChange={onChangeText}
      />
    </div>
  );

  function onChangeText(event: ChangeEvent<HTMLInputElement>) {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  }
}
