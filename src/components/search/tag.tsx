export type SearchTagProps = {
  text: string,
};

export default function SearchTag(props: SearchTagProps) {
  return (
    <div className='bg-main text-white cursor-pointer rounded-md px-2 py-1/2 select-none'>
      {props.text}
    </div>
  );
}
