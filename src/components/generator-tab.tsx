
"use client";

import { useState, useEffect } from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { generateUiCode } from '@/ai/flows/generate-ui-from-prompt';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UIPreview } from '@/components/ui-preview';
import { CodeDisplay } from '@/components/code-display';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';

const themes = [
  'Modern', 
  'Minimalist', 
  'Playful', 
  'Corporate', 
  'Elegant', 
  'Futuristic',
  'Glassmorphism',
  'Neumorphism',
  'Brutalist',
  'Kawaii',
  'Retro',
  'Vaporwave',
  'Cyberpunk'
];
const componentTypes = [
  'Login Form', 
  'Pricing Section', 
  'Contact Form', 
  'Hero Section', 
  'Testimonials', 
  'FAQ Section',
  '3D Animated Card',
  'Interactive Product Showcase',
  'Onboarding Flow',
  'User Profile Card',
  'Music Player',
  'Dashboard Widget',
  'Timeline',
  'Chat Interface',
  'Notifications Panel'
];

const placeholderPrompt = "A modern hero section for a SaaS startup with a title, a short paragraph, a call-to-action button, and a placeholder image on the right.";

export function GeneratorTab() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ html: string } | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [extraInstructions, setExtraInstructions] = useState('');

  const handleGenerate = async (currentPrompt: string) => {
    if (!currentPrompt.trim()) {
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
      const result = await generateUiCode({ prompt: currentPrompt, extraInstructions });
      setGeneratedCode(result);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || '';
      if (errorMessage.includes('503') || errorMessage.toLowerCase().includes('overloaded')) {
        toast({
          variant: "destructive",
          title: "Model is Overloaded",
          description: "The AI model is currently experiencing high demand. Please try again in a few moments.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Something went wrong while generating the UI. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGenerate(prompt);
  };
  
  const handleSurprise = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomComponent = componentTypes[Math.floor(Math.random() * componentTypes.length)];
    const surprisePrompt = `A ${randomTheme.toLowerCase()} ${randomComponent.toLowerCase()} for a website.`;
    
    setPrompt(surprisePrompt);
    setSelectedTheme(randomTheme);
    setSelectedComponent(randomComponent);
    setExtraInstructions("Add a simple fade-in animation to the main container.");

    // We pass the new prompt directly to ensure the generation uses it
    handleGenerate(surprisePrompt);
  };

  useEffect(() => {
    if (selectedTheme || selectedComponent) {
      const themePart = selectedTheme ? `${selectedTheme} ` : '';
      const componentPart = selectedComponent ? `${selectedComponent}` : 'UI component';
      let fullPrompt = `A ${themePart}${componentPart.toLowerCase()}`;
      
      if (selectedComponent && !selectedTheme) {
        // "A Login Form"
      } else if (selectedTheme && !selectedComponent) {
        // "A Modern themed UI"
        fullPrompt += ' themed UI';
      } else {
        // "A Modern Login Form for a website"
        fullPrompt += ' for a website';
      }
      
      setPrompt(fullPrompt + '.');
    }
  }, [selectedTheme, selectedComponent]);

  return (
    <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 md:grid-rows-[min-content_1fr]">
      <div className="flex flex-col gap-6 md:row-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI UI Generator</CardTitle>
            <CardDescription>Describe the UI you want to create, or let us surprise you!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme} disabled={loading}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="component-type">Component Type</Label>
                   <Select value={selectedComponent} onValueChange={setSelectedComponent} disabled={loading}>
                    <SelectTrigger id="component-type">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {componentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

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

               <div className="grid w-full gap-1.5">
                <Label htmlFor="extra-instructions">Animation & Styling Instructions (Optional)</Label>
                <Textarea
                  id="extra-instructions"
                  placeholder="e.g., 'Animate the card with a spring effect on hover.' or 'Use a gradient of purple and blue for the background.'"
                  value={extraInstructions}
                  onChange={(e) => setExtraInstructions(e.target.value)}
                  className="min-h-[80px]"
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate UI
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleSurprise} disabled={loading}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Surprise Me!
                </Button>
              </div>
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
             <div className="flex h-full w-full items-center justify-center bg-card p-8">
              <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 w-fit rounded-full bg-primary/10 p-4">
                  <Wand2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold">Your generated UI will appear here</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Describe a component, choose a theme, or click "Surprise Me!" to get started.
                </p>
                <div className="mt-8 space-y-4 rounded-lg border border-dashed border-border/50 p-4">
                  <Skeleton className="h-16 w-full" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 flex-grow" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}
