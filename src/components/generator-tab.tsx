"use client";

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { generateUiCode } from '@/ai/flows/generate-ui-from-prompt';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UIPreview } from '@/components/ui-preview';
import { CodeDisplay } from '@/components/code-display';

const placeholderPrompt = "A modern hero section for a SaaS startup with a title, a short paragraph, a call-to-action button, and a placeholder image on the right.";

export function GeneratorTab() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ html: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Prompt is empty",
        description: "Please enter a description for the UI you want to generate.",
      });
      return;
    }
    setLoading(true);
    setGeneratedCode(null);
    try {
      const result = await generateUiCode({ prompt });
      setGeneratedCode(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Something went wrong while generating the UI. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 md:grid-rows-[min-content_1fr]">
      <div className="flex flex-col gap-6 md:row-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI UI Generator</CardTitle>
            <CardDescription>Describe the UI you want to create, and our AI will bring it to life.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="prompt">Your Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder={placeholderPrompt}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px]"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate UI
              </Button>
            </form>
          </CardContent>
        </Card>
        {generatedCode && (
          <div className="flex flex-col gap-4">
             <h3 className="font-headline text-lg font-semibold">Export Code</h3>
            <CodeDisplay html={generatedCode.html} />
          </div>
        )}
      </div>
      <h3 className="font-headline text-lg font-semibold">Live Preview</h3>
      <div className="relative min-h-[400px] rounded-lg border bg-card shadow-sm overflow-hidden">
        {loading ? (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your UI...</p>
                </div>
            </div>
        ) : generatedCode ? (
          <UIPreview html={generatedCode.html} />
        ) : (
            <div className="flex h-full items-center justify-center bg-card">
                <div className="text-center text-muted-foreground">
                    <Wand2 className="mx-auto h-12 w-12" />
                    <p className="mt-4">Your generated UI will appear here.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
