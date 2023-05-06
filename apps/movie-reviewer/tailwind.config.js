const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    colors: { ...require('tailwindcss/colors') },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'false',
    themes: ['dark'],
  },
};
module.exports = config;
