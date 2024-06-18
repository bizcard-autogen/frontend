export type ButtonProps = {
  text: string,
  dimColor?: boolean,
  onClick?: () => void,
};

export default function Button(props: ButtonProps) {
  const colorClassName = props.dimColor ? 'bg-dim active:bg-ltdim' : 'bg-main active:bg-ltmain';

  return (
    <span
      className={colorClassName + ' text-white transition-colors text-center rounded cursor-pointer select-none px-3 py-2'}
      onClick={props.onClick}
    >
      {props.text}
    </span>
  );
}
