"use client";

import { Logo } from '@/components/icons/logo';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

export function AppHeader() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };
  
  const showAuthButton = pathname.includes('/dashboard');

  return (
    <header className="border-b bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl font-bold tracking-tight text-foreground">
              CORRECTED UI
            </h1>
          </div>
          {showAuthButton && user && (
            <div className="ml-auto">
              <Button variant="outline" onClick={handleSignOut}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
