"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeDisplayProps {
  html: string;
  css: string;
}

export function CodeDisplay({ html, css }: CodeDisplayProps) {
  const [copied, setCopied] = useState<'html' | 'css' | null>(null);

  const handleCopy = (text: string, type: 'html' | 'css') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, onCopy, isCopied }: { code: string; onCopy: () => void; isCopied: boolean }) => (
    <div className="relative">
      <ScrollArea className="h-64 rounded-md border bg-secondary/50 p-4">
        <pre className="text-sm font-code text-secondary-foreground">{code}</pre>
      </ScrollArea>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-7 w-7"
        onClick={onCopy}
        aria-label={`Copy ${isCopied ? 'copied' : 'code'}`}
      >
        {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );

  return (
    <Tabs defaultValue="html" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
      </TabsList>
      <TabsContent value="html">
        <CodeBlock code={html} onCopy={() => handleCopy(html, 'html')} isCopied={copied === 'html'} />
      </TabsContent>
      <TabsContent value="css">
        <CodeBlock code={css} onCopy={() => handleCopy(css, 'css')} isCopied={copied === 'css'} />
      </TabsContent>
    </Tabs>
  );
}
