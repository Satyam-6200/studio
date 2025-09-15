import { AppHeader } from "@/components/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneratorTab } from "@/components/generator-tab";
import { OptimizerTab } from "@/components/optimizer-tab";
import { LibraryTab } from "@/components/library-tab";
import { Wand2, Lightbulb, Library } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-grow overflow-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="generator" className="h-full">
          <div className="flex justify-center">
            <TabsList className="mb-6 grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="generator" className="gap-2">
                <Wand2 className="h-4 w-4"/> Generator
              </TabsTrigger>
              <TabsTrigger value="optimizer" className="gap-2">
                <Lightbulb className="h-4 w-4" /> Optimizer
              </TabsTrigger>
              <TabsTrigger value="library" className="gap-2">
                <Library className="h-4 w-4" /> Library
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="generator" className="h-full">
            <GeneratorTab />
          </TabsContent>
          <TabsContent value="optimizer" className="h-full">
            <OptimizerTab />
          </TabsContent>
          <TabsContent value="library" className="h-full">
            <LibraryTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
