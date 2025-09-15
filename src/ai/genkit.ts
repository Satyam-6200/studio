import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {nextPlugin} from '@genkit-ai/next';

configureGenkit({
  plugins: [
    googleAI(),
    nextPlugin({
      // You can pass in Next.js-specific options here.
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit({
  model: 'googleai/gemini-2.5-flash',
});
