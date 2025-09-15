import { Logo } from '@/components/icons/logo';

export function AppHeader() {
  return (
    <header className="border-b bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl font-bold tracking-tight text-foreground">
              UI Spark
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
