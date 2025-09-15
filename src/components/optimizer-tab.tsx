"use client";

import { useState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { suggestUxOptimizations } from '@/ai/flows/suggest-ux-optimizations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const placeholderCode = `
<div class="container">
  <button class="button">Click me</button>
</div>

<style>
.container {
  background-color: #E0E0E0;
}
.button {
  background-color: #F5F5F5;
  color: #BDBDBD;
  padding: 10px;
  border: none;
}
</style>
`;

export function OptimizerTab() {
  const { toast } = useToast();
  const [uiCode, setUiCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uiCode.trim()) {
      toast({
        variant: "destructive",
        title: "Code is empty",
        description: "Please paste your UI code to get optimization suggestions.",
      });
      return;
    }
    setLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestUxOptimizations({ uiCode });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Something went wrong while analyzing your code. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">UX Optimizer</CardTitle>
          <CardDescription>Paste your HTML and CSS code to get AI-powered UX improvement suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="ui-code">Your UI Code (HTML/CSS)</Label>
              <Textarea
                id="ui-code"
                placeholder={placeholderCode}
                value={uiCode}
                onChange={(e) => setUiCode(e.target.value)}
                className="min-h-[300px] font-code text-sm"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Analyze UX
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Optimization Suggestions</CardTitle>
          <CardDescription>Our AI's recommendations will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="h-full rounded-lg border bg-secondary/50">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 text-muted-foreground">Analyzing your code...</p>
                  </div>
              </div>
            ) : suggestions ? (
              <ScrollArea className="h-full">
                <p className="whitespace-pre-wrap p-6 text-sm text-foreground">
                    {suggestions}
                </p>
              </ScrollArea>
            ) : (
                <div className="flex h-full items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <Lightbulb className="mx-auto h-12 w-12" />
                        <p className="mt-4">Your suggestions will appear here.</p>
                    </div>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
