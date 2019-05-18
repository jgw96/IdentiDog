import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://identidog-app.firebaseapp.com/',
      prerenderConfig: './prerender.config.js',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    },
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  copy: [
    { src: 'assets/.well-known/', dest: '.well-known/' }
  ]
};
