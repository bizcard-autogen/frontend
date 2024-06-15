export type CardPreviewProps = {
  title: string,
};

export default function CardPreview(props: CardPreviewProps) {
  return (
    <div className='flex flex-col items-center'>
      <span>
        <span className='bg-main text-white text-sm rounded px-2 py-1'>
          {props.title}
        </span>
      </span>
      <div className='bg-faded mt-2 h-[151px] w-[250px]'>
      </div>
    </div>
  );
}
