import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Showcase } from '@/components/showcase';

export default function Home() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader />
      <main className="flex-grow">
        <section className="relative h-full flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
           <div 
            className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-blob"
          ></div>
          <div 
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"
          ></div>
          <div
            className="absolute top-0 -right-40 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"
          ></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-4">
              Build UIs with CORRECTED UI
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              An AI-powered platform to generate, optimize, and discover beautiful UI components for your next project.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <Showcase />
      </main>
    </div>
  );
}
