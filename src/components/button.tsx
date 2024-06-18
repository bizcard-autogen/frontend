export type ButtonProps = {
  text: string,
  onClick?: () => void,
};

export default function Button(props: ButtonProps) {
  return (
    <span
      className='bg-main active:bg-ltmain transition-colors text-white text-center rounded cursor-pointer select-none px-3 py-2'
      onClick={props.onClick}
    >
      {props.text}
    </span>
  );
}
