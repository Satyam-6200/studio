'use server';

/**
 * @fileOverview Provides UX optimization suggestions for a given UI code.
 *
 * - suggestUxOptimizations - A function that takes UI code as input and returns UX improvement suggestions.
 * - SuggestUxOptimizationsInput - The input type for the suggestUxOptimizations function.
 * - SuggestUxOptimizationsOutput - The return type for the suggestUxOptimizations function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SuggestUxOptimizationsInputSchema = z.object({
  uiCode: z
    .string()
    .describe('The HTML/CSS code of the UI to be analyzed.'),
});
export type SuggestUxOptimizationsInput = z.infer<
  typeof SuggestUxOptimizationsInputSchema
>;

const SuggestUxOptimizationsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of UX optimization suggestions for the given UI code.'
    ),
});
export type SuggestUxOptimizationsOutput = z.infer<
  typeof SuggestUxOptimizationsOutputSchema
>;

export async function suggestUxOptimizations(
  input: SuggestUxOptimizationsInput
): Promise<SuggestUxOptimizationsOutput> {
  return suggestUxOptimizationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUxOptimizationsPrompt',
  input: {schema: SuggestUxOptimizationsInputSchema},
  output: {schema: SuggestUxOptimizationsOutputSchema},
  model: googleAI.model('gemini-1.5-flash-preview-0514'),
  prompt: `You are an expert UX designer. Analyze the following UI code and provide suggestions for UX improvements, such as color contrast adjustments or flow enhancements, so that I can create a more user-friendly interface.

UI Code:
{{{uiCode}}}`,
});

const suggestUxOptimizationsFlow = ai.defineFlow(
  {
    name: 'suggestUxOptimizationsFlow',
    inputSchema: SuggestUxOptimizationsInputSchema,
    outputSchema: SuggestUxOptimizationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
