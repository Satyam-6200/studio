"use client";

import { AppHeader } from "@/components/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneratorTab, GenerationHistoryItem } from "@/components/generator-tab";
import { OptimizerTab } from "@/components/optimizer-tab";
import { LibraryTab } from "@/components/library-tab";
import { HistoryTab } from "@/components/history-tab";
import { Wand2, Lightbulb, Library, History } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);

  const addHistoryItem = (item: GenerationHistoryItem) => {
    setHistory(prev => [item, ...prev]);
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-grow overflow-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="generator" className="h-full">
          <div className="flex justify-center">
            <TabsList className="mb-6 grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="generator" className="gap-2">
                <Wand2 className="h-4 w-4" /> Generator
              </TabsTrigger>
              <TabsTrigger value="optimizer" className="gap-2">
                <Lightbulb className="h-4 w-4" /> Optimizer
              </TabsTrigger>
              <TabsTrigger value="library" className="gap-2">
                <Library className="h-4 w-4" /> Library
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" /> History
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="generator" className="h-full">
            <GeneratorTab onGenerate={addHistoryItem} />
          </TabsContent>
          <TabsContent value="optimizer" className="h-full">
            <OptimizerTab />
          </TabsContent>
          <TabsContent value="library" className="h-full">
            <LibraryTab />
          </TabsContent>
           <TabsContent value="history" className="h-full">
            <HistoryTab history={history} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
