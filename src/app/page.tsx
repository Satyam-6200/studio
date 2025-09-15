import { AppHeader } from '@/components/app-header';
import { GeneratorTab } from '@/components/generator-tab';
import { LibraryTab } from '@/components/library-tab';
import { OptimizerTab } from '@/components/optimizer-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Lightbulb, Library } from 'lucide-react';


export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="generator" className="flex h-full flex-col">
          <TabsList className="mb-4 grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="generator">
              <Wand2 className="mr-2 h-4 w-4" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="optimizer">
              <Lightbulb className="mr-2 h-4 w-4" />
              Optimizer
            </TabsTrigger>
            <TabsTrigger value="library">
              <Library className="mr-2 h-4 w-4" />
              Library
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="flex-grow">
            <GeneratorTab />
          </TabsContent>
          <TabsContent value="optimizer" className="flex-grow">
            <OptimizerTab />
          </TabsContent>
          <TabsContent value="library">
            <LibraryTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
