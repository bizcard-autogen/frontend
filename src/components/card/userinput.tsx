import { ChangeEvent } from 'react';

export type CardUserInputProps = {
  required: boolean,
  title: string,
  placeholder: string,
  onChange?: (text: string) => void,
};

export default function CardUserInput(props: CardUserInputProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-end gap-2 ml-3 mb-1'>
        <div className='text-sm text-main font-bold'>
          {props.title}
        </div>
        <div
          className='text-xs text-red-600 font-bold'
          style={{
            display: props.required ? 'block' : 'none',
          }}
        >
          *必須
        </div>
      </div>
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
