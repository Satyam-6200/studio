
'use server';
/**
 * @fileOverview An AI flow for generating images.
 *
 * - generateImage - A function that generates an image from a prompt, with an optional reference image.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
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
  async ({ prompt, referenceImageDataUri }) => {
    let response;
    
    try {
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
          },
        });
      } else {
        // Text-to-image generation
        response = await ai.generate({
          model: 'googleai/gemini-2.5-flash-image-preview',
          prompt: prompt,
          config: {
            responseModalities: ['TEXT', 'IMAGE'],
          }
        });
      }

      if (!response.media || !response.media.url) {
        throw new Error('Image generation failed to produce an image.');
      }

      return { imageDataUri: response.media.url };

    } catch (error: any) {
        console.error("Error during image generation:", error.message);
        const errorMessage = error.message || '';

        if (errorMessage.includes('429') || errorMessage.includes('quota')) {
            throw new Error("QUOTA_EXCEEDED: The image generation quota for the free tier has been reached. Please check your plan and billing details.");
        }
        if (errorMessage.includes('400') && errorMessage.includes('billed user')) {
             throw new Error("QUOTA_EXCEEDED: This model is only available to billed users. Please check your project's billing status.");
        }

        throw new Error("An unexpected error occurred during image generation.");
    }
  }
);
