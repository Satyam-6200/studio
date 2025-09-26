
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
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const GenerateUiCodeInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired UI layout.'),
  extraInstructions: z.string().optional().describe('Optional instructions for animations, colors, or other styling details.'),
});
export type GenerateUiCodeInput = z.infer<typeof GenerateUiCodeInputSchema>;

const GenerateUiCodeOutputSchema = z.object({
  html: z.string().describe('The generated HTML code using Tailwind CSS and optionally Framer Motion for animations.'),
  error: z.string().optional().describe('An error message if the generation failed.'),
});
export type GenerateUiCodeOutput = z.infer<typeof GenerateUiCodeOutputSchema>;

export async function generateUiCode(input: GenerateUiCodeInput): Promise<GenerateUiCodeOutput> {
  return generateUiCodeFlow(input);
}

const basePrompt = `You are an AI expert in UI/UX design, Tailwind CSS, and Framer Motion.

  You will generate a single block of HTML code based on the user's prompt.
  The HTML should be styled using Tailwind CSS classes.
  
  If the user's prompt mentions an image, use a placeholder from picsum.photos.
  - The image URL should be in the format: https://picsum.photos/seed/{seed}/{width}/{height} (e.g., https://picsum.photos/seed/1/600/400).
  - Use a random number for the seed.
  - Add a 'data-ai-hint' attribute to the image tag with one or two keywords describing the image for later replacement (e.g., data-ai-hint="nature landscape").

  If the user provides animation or styling instructions, apply them.
  - For animations, use Framer Motion by adding attributes like "initial", "animate", "whileHover", etc. to the HTML tags. You CANNOT use the <motion.div> syntax, just add the props to standard HTML elements.
  - For styling, use Tailwind CSS classes. Be creative with colors, gradients, and effects if requested.

  Do not include any <style> tags or separate CSS.
  Ensure the code is responsive and well-structured.

  Prompt: {{{prompt}}}

  {{#if extraInstructions}}
  Animation & Styling Instructions: {{{extraInstructions}}}
  {{/if}}

  Return only the HTML code in the following format:
  {
    "html": "..."
  }`;

const prompt = ai.definePrompt({
  name: 'generateUiCodePrompt',
  input: {schema: GenerateUiCodeInputSchema},
  output: {schema: z.object({ html: z.string() })},
  model: googleAI.model('gemini-1.5-pro'),
  prompt: basePrompt,
});

const fallbackPrompt = ai.definePrompt({
    name: 'generateUiCodeFallbackPrompt',
    input: {schema: GenerateUiCodeInputSchema},
    output: {schema: z.object({ html: z.string() })},
    model: googleAI.model('gemini-1.0-pro'),
    prompt: basePrompt,
});


const generateUiCodeFlow = ai.defineFlow(
  {
    name: 'generateUiCodeFlow',
    inputSchema: GenerateUiCodeInputSchema,
    outputSchema: GenerateUiCodeOutputSchema,
  },
  async input => {
    try {
        console.log('Attempting to generate UI with primary model...');
        const {output} = await prompt(input);
        return { html: output!.html };
    } catch (error: any) {
        console.warn('Primary model failed:', error.message);
        const errorMessage = error.message || '';

        // If the primary model is overloaded or has hit a quota, try the fallback.
        if (errorMessage.includes('503') || errorMessage.includes('429') || errorMessage.includes('quota')) {
            console.log('Primary model unavailable. Retrying with fallback model...');
            try {
              const {output} = await fallbackPrompt(input);
              return { html: output!.html };
            } catch (fallbackError: any) {
              console.error('Fallback model also failed:', fallbackError.message);
              const fallbackErrorMessage = fallbackError.message || '';
              if (fallbackErrorMessage.includes('429') || fallbackErrorMessage.includes('quota')) {
                return { html: '', error: 'QUOTA_EXCEEDED' };
              }
              // For other fallback errors, we can just return the error.
              return { html: '', error: fallbackErrorMessage };
            }
        }
        
        // If it's a different error, return it.
        return { html: '', error: errorMessage };
    }
  }
);
