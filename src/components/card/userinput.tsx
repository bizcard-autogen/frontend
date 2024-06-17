import { ChangeEvent } from 'react';

export type CardUserInputProps = {
  title: string,
  placeholder: string,
  onChange?: (text: string) => void,
};

export default function CardUserInput(props: CardUserInputProps) {
  return (
    <div className='flex flex-col'>
      <div className='text-sm text-main font-bold ml-3 mb-1'>
        {props.title}
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
