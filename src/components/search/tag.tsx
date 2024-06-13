export type SearchTagProps = {
  text: string,
};

export default function SearchTag(props: SearchTagProps) {
  return (
    <div className='bg-slate-600 text-white cursor-pointer rounded-md px-2 py-1/2 mt-1 mr-1 select-none'>
      {props.text}
    </div>
  );
}
