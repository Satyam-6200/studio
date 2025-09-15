'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextPlugin} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI(),
    nextPlugin({
      // You can pass in Next.js-specific options here.
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
