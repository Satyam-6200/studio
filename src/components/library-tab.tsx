"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
  },
  {
    name: "Input",
    category: "Form",
    preview: (
      <Input placeholder="Enter text..." className="max-w-xs" />
    ),
  },
  {
    name: "Checkbox",
    category: "Form",
    preview: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    ),
  },
    {
    name: "Textarea",
    category: "Form",
    preview: (
      <Textarea placeholder="Type your message here." className="max-w-xs" />
    ),
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
        <p className="text-muted-foreground">Browse and search for reusable UI components.</p>
      </div>
      <Input 
        placeholder="Search components (e.g., Button, Form)..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map(component => (
          <Card key={component.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <Badge variant="secondary">{component.category}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[100px] items-center justify-center rounded-md border border-dashed p-6">
                {component.preview}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredComponents.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">No components found.</p>
        )}
      </div>
    </div>
  );
}
