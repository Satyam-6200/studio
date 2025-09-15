import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { UiAnimation } from "@/components/ui-animation";

export default function LoginPage() {
  return (
    <div 
      className="relative flex h-full w-full items-center justify-center bg-background p-4 sm:p-8 md:p-12"
    >
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{backgroundImage: "url('https://picsum.photos/seed/uidesign/1920/1080')"}}
        data-ai-hint="UI innovation"
      ></div>
      <div className="relative grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Card className="w-full max-w-sm justify-self-center lg:justify-self-start">
          <CardHeader className="space-y-2 text-center">
              <Logo className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold font-headline">Welcome Back</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Link href="/dashboard" className="block w-full">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
        <UiAnimation />
      </div>
    </div>
  );
}
