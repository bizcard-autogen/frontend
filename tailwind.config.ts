import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#3c53a5',
        ltmain: '#4d64b8',
        faded: '#eff1f7',
        dim: '#6d717d',
        ltdim: '#898e9a',
        gray: '#777777',
      },
    },
  },
  plugins: [],
};
export default config;
