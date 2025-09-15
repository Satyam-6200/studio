"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { UiAnimation } from "@/components/ui-animation";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const { user, signUpWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Passwords do not match.",
      });
      return;
    }
    try {
      await signUpWithEmail(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    }
  };

  return (
    <div 
      className="relative flex h-full w-full items-center justify-center bg-background p-4 sm:p-8 md:p-12 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=2070&auto=format&fit=crop')"}}
        data-ai-hint="abstract technology"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background"></div>
      <div className="relative grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Card className="w-full max-w-sm justify-self-center lg:justify-self-start z-10 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <Logo className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
            <CardDescription>Enter your details to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
        <UiAnimation />
      </div>
    </div>
  );
}
