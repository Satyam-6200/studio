"use client";

import type { GenerationHistoryItem } from './generator-tab';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeDisplay } from '@/components/ui-preview';
import { UIPreview } from '@/components/ui-preview';
import { History, FileText, Code } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface HistoryTabProps {
  history: GenerationHistoryItem[];
}

export function HistoryTab({ history }: HistoryTabProps) {

  if (history.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <History className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Generation History</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your generated UI components will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
       <div>
        <h2 className="font-headline text-2xl font-bold">Generation History</h2>
        <p className="text-muted-foreground">Here is a list of the UI you have generated in this session.</p>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {history.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="rounded-lg border bg-card px-4">
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between pr-4">
                <div className='text-left'>
                  <p className="font-semibold">{item.prompt.substring(0, 80)}{item.prompt.length > 80 && '...'}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-2">
                <div>
                   <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Your Prompt</h4>
                   <p className="text-sm text-muted-foreground bg-secondary/50 rounded-md p-3 border">{item.prompt}</p>
                   {item.extraInstructions && (
                     <>
                      <h4 className="font-semibold mt-4 mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Styling Instructions</h4>
                      <p className="text-sm text-muted-foreground bg-secondary/50 rounded-md p-3 border">{item.extraInstructions}</p>
                     </>
                   )}
                   <h4 className="font-semibold mt-4 mb-2 flex items-center gap-2"><Code className="h-4 w-4" /> Generated Code</h4>
                   <CodeDisplay html={item.html} />
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Live Preview</h4>
                    <div className="relative min-h-[300px] rounded-lg border bg-card shadow-sm overflow-hidden">
                       <UIPreview html={item.html} />
                    </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
