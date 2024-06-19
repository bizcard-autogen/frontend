import * as React from 'react';

export type LoadingIconProps = {
  scale?: number,
  opacity?: number,
};

export default function LoadingIcon(props: LoadingIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      width={120}
      height={30}
      transform={`scale(${props.scale ?? 1})`}
      opacity={props.opacity ?? 1}
    >
      <circle cx={15} cy={15} r={15} fill='#081006'>
        <animate
          fill='remove'
          accumulate='none'
          additive='replace'
          attributeName='r'
          begin='0s'
          calcMode='linear'
          dur='0.8s'
          from={15}
          repeatCount='indefinite'
          restart='always'
          to={15}
          values='15;9;15'
        />
        <animate
          fill='remove'
          accumulate='none'
          additive='replace'
          attributeName='fill-opacity'
          begin='0s'
          calcMode='linear'
          dur='0.8s'
          from={1}
          repeatCount='indefinite'
          restart='always'
          to={1}
          values='1;.5;1'
        />
      </circle>
      <circle cx={60} cy={15} r={9} fill='#081006' fillOpacity={0.3}>
        <animate
          fill='remove'
          accumulate='none'
          additive='replace'
          attributeName='r'
          begin='0s'
          calcMode='linear'
          dur='0.8s'
          from={9}
          repeatCount='indefinite'
          restart='always'
          to={9}
          values='9;15;9'
        />
        <animate
          fill='remove'
          accumulate='none'
          additive='replace'
          attributeName='fill-opacity'
          begin='0s'
          calcMode='linear'
          dur='0.8s'
          from={0.5}
          repeatCount='indefinite'
          restart='always'
          to={0.5}
          values='.5;1;.5'
        />
      </circle>
      <circle cx={105} cy={15} r={15} fill='#081006'>
        <animate
          fill='remove'
          accumulate='none'
          additive='replace'
          attributeName='r'
          begin='0s'
          calcMode='linear'
          dur='0.8s'
          from={15}
          repeatCount='indefinite'
          restart='always'
          to={15}
          values='15;9;15'
        />
        <animate
          fill='remove'
          accumulate='none'
          additive='replace'
          attributeName='fill-opacity'
          begin='0s'
          calcMode='linear'
          dur='0.8s'
          from={1}
          repeatCount='indefinite'
          restart='always'
          to={1}
          values='1;.5;1'
        />
      </circle>
    </svg>
  );
}
