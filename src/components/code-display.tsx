"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeDisplayProps {
  html: string;
}

export function CodeDisplay({ html }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <ScrollArea className="h-64 rounded-md border bg-secondary/50 p-4">
        <pre className="text-sm font-code text-secondary-foreground">{html}</pre>
      </ScrollArea>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-7 w-7"
        onClick={() => handleCopy(html)}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
