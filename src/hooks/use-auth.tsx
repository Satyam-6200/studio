"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "firebase/auth";

// SIMULATED USER FOR DEMO MODE
const demoUser = {
  uid: "demouser",
  email: "demo@example.com",
  displayName: "Demo User",
} as User;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = demoUser;
  const loading = false;

  const signInWithEmail = async (email: string, pass: string) => {
    console.log("DEMO MODE: Simulating login for", email);
    return Promise.resolve();
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    console.log("DEMO MODE: Simulating signup for", email);
    return Promise.resolve();
  };
  
  const signOut = async () => {
    console.log("DEMO MODE: Simulating logout");
    // In a real app, you'd clear the user state. Here, we do nothing to stay logged in.
     return Promise.resolve();
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
