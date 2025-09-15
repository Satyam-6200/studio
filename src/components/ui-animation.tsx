"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

export function UiAnimation() {
  return (
    <motion.div
      className="relative hidden h-full w-full items-center justify-center lg:flex"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h3 className="font-semibold">Pro Plan</h3>
              <p className="text-4xl font-bold">$49</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Unlimited Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Advanced Analytics</span>
              </div>
              <Button>Choose Plan</Button>
            </CardContent>
          </Card>
        </motion.div>
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">4.0/5</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
             <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <Zap className="h-6 w-6" />
                        <div >
                            <h4 className="font-semibold">Supercharge your workflow</h4>
                            <p className="text-sm opacity-80">Get started in minutes.</p>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
