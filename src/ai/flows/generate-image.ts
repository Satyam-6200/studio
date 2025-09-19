
'use server';
/**
 * @fileOverview An AI flow for generating images.
 *
 * - generateImage - A function that generates an image from a prompt, with an optional reference image.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the image to generate.'),
  referenceImageDataUri: z
    .string()
    .optional()
    .nullable()
    .describe(
      "An optional reference image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  aspectRatio: z.string().optional().describe('The desired aspect ratio for the generated image (e.g., "1:1", "16:9", "9:16").'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({ prompt, referenceImageDataUri, aspectRatio }) => {
    let response;

    if (referenceImageDataUri) {
      // Image-to-image generation
      response = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          { media: { url: referenceImageDataUri } },
          { text: prompt },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          ...(aspectRatio ? { aspectRatio } : {}),
        },
      });
    } else {
      // Text-to-image generation
      response = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          ...(aspectRatio ? { aspectRatio } : {}),
        }
      });
    }

    if (!response.media || !response.media.url) {
      throw new Error('Image generation failed to produce an image.');
    }

    return { imageDataUri: response.media.url };
  }
);
