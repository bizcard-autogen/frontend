import * as React from 'react';
import { SvgProps } from '@/utils/icon';

export default function LeftIcon(props: SvgProps) {
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
        d='M419.916 71.821 348.084 0l-256 256.005 256 255.995 71.832-71.822-184.174-184.173z'
        style={{
          fill: props.color ?? '#ffffff',
        }}
      />
    </svg>
  );
}
