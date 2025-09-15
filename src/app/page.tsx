import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Pricing } from '@/components/pricing';

export default function Home() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader />
      <main className="flex-grow">
        <section className="relative flex flex-col items-center justify-center overflow-x-hidden px-4 py-20 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--muted))_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 mb-24">
            <h1 className="text-5xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-4 md:text-7xl">
              Build UIs with UI Spark
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
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
          <div className="absolute bottom-0 left-0 w-full">
            <div className="h-24 w-full bg-[radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]"></div>
          </div>
        </section>
        <Pricing />
      </main>
    </div>
  );
}
