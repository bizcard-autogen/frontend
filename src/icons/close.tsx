import * as React from 'react'

export type SvgProps = {
  size?: number,
  height?: number,
  width?: number,
};

export default function CloseIcon(props: SvgProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      style={{
        width: props.size ?? props.width ?? 32,
        height: props.size ?? props.height ?? 32,
        opacity: 1,
      }}
      viewBox='0 0 512 512'
    >
      <path
        d='M512 89.75 422.256.005 256.004 166.256 89.754.005 0 89.75 166.255 256 0 422.25l89.754 89.745 166.25-166.25 166.256 166.25L512 422.25 345.744 256z'
        style={{
          fill: '#fff',
        }}
      />
    </svg>
  );
}
