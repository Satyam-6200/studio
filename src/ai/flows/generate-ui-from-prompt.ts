// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Generates UI code (HTML/CSS) from a text prompt.
 *
 * - generateUiCode - A function that takes a text prompt and returns HTML/CSS code.
 * - GenerateUiCodeInput - The input type for the generateUiCode function.
 * - GenerateUiCodeOutput - The return type for the generateUiCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUiCodeInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired UI layout.'),
});
export type GenerateUiCodeInput = z.infer<typeof GenerateUiCodeInputSchema>;

const GenerateUiCodeOutputSchema = z.object({
  html: z.string().describe('The generated HTML code.'),
  css: z.string().describe('The generated CSS code.'),
});
export type GenerateUiCodeOutput = z.infer<typeof GenerateUiCodeOutputSchema>;

export async function generateUiCode(input: GenerateUiCodeInput): Promise<GenerateUiCodeOutput> {
  return generateUiCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUiCodePrompt',
  input: {schema: GenerateUiCodeInputSchema},
  output: {schema: GenerateUiCodeOutputSchema},
  prompt: `You are an AI expert in UI/UX design.

  You will generate HTML and CSS code based on the user's prompt.
  Ensure the code is responsive and well-structured.

  Prompt: {{{prompt}}}

  Return the HTML and CSS code in the following format:
  {
    "html": "...",
    "css": "..."
  }`,
});

const generateUiCodeFlow = ai.defineFlow(
  {
    name: 'generateUiCodeFlow',
    inputSchema: GenerateUiCodeInputSchema,
    outputSchema: GenerateUiCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
