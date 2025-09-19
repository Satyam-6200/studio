"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TiltCard } from '@/components/tilt-card';
import { Code, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CodeDisplay } from './code-display';

const components = [
  {
    name: "Button",
    category: "Form",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `<Button>Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="destructive">Destructive</Button>`,
  },
  {
    name: "Card",
    category: "Layout",
    preview: (
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a sample card component.</p>
        </CardContent>
      </Card>
    ),
    code: `<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <p>This is a sample card component.</p>\n  </CardContent>\n</Card>`,
  },
  {
    name: "Badge",
    category: "UI",
    preview: (
       <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
       </div>
    ),
    code: `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="outline">Outline</Badge>`,
  },
  {
    name: "Input",
    category: "Form",
    preview: (
      <Input placeholder="Enter text..." className="max-w-xs" />
    ),
    code: `<Input placeholder="Enter text..." />`,
  },
  {
    name: "Checkbox",
    category: "Form",
    preview: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms-demo" />
        <Label htmlFor="terms-demo">Accept terms</Label>
      </div>
    ),
    code: `<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms</Label>\n</div>`,
  },
    {
    name: "Textarea",
    category: "Form",
    preview: (
      <Textarea placeholder="Type your message here." className="max-w-xs" />
    ),
    code: `<Textarea placeholder="Type your message here." />`,
  },
];

export function LibraryTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = components.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-headline text-2xl font-bold">Component Library</h2>
        <p className="text-muted-foreground">Browse, search, and copy code for reusable UI components.</p>
      </div>
      <Input 
        placeholder="Search components (e.g., Button, Form)..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map(component => (
          <Dialog key={component.name}>
            <TiltCard>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                  <Badge variant="secondary">{component.category}</Badge>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center">
                    <div className="flex min-h-[100px] items-center justify-center rounded-md border border-dashed p-6">
                      {component.preview}
                    </div>
                </CardContent>
                <div className="p-4 pt-0">
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Code className="mr-2 h-4 w-4" />
                      Show Code
                    </Button>
                  </DialogTrigger>
                </div>
              </Card>
            </TiltCard>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{component.name} - Code Example</DialogTitle>
              </DialogHeader>
              <CodeDisplay html={component.code} />
            </DialogContent>
          </Dialog>
        ))}
        {filteredComponents.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">No components found.</p>
        )}
      </div>
    </div>
  );
}
