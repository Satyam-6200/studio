"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Star, Code } from "lucide-react";

export function UiAnimation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-500, 500], [-15, 15]);
  const rotateY = useTransform(mouseX, [-500, 500], [15, -15]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative hidden h-[500px] w-full max-w-lg items-center justify-center rounded-lg bg-card/50 lg:flex"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"></div>
      
      {/* Base Card */}
      <motion.div
        className="absolute h-80 w-72 rounded-xl bg-background/70 shadow-2xl backdrop-blur-sm"
        style={{ transform: "translateZ(0px)" }}
      ></motion.div>

      {/* Floating UI Elements */}
      <motion.div
        className="absolute"
        style={{ transform: "translateZ(50px) translateY(-80px) translateX(-120px)" }}
      >
        <Card className="w-64 bg-background/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-lg">
              <Star className="h-5 w-5 text-yellow-400" />
              Upgrade Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary hover:bg-primary/90">Choose Pro</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="absolute flex items-center gap-2"
        style={{ transform: "translateZ(80px) translateY(50px) translateX(100px)" }}
      >
        <Switch id="dark-mode" defaultChecked />
        <label htmlFor="dark-mode" className="text-sm font-medium text-foreground">Dark Mode</label>
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ transform: "translateZ(30px) translateY(120px) translateX(-90px)" }}
      >
        <Input placeholder="Search..." className="w-48 bg-background/80 backdrop-blur-md"/>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ transform: "translateZ(120px) translateY(100px) translateX(120px)" }}
      >
         <Badge variant="secondary" className="gap-1.5 pl-2">
           <Code className="h-3 w-3" />
           New Component
          </Badge>
      </motion.div>

       <motion.div
        className="absolute"
        style={{ transform: "translateZ(100px) translateY(-140px) translateX(60px)" }}
      >
        <Button size="icon" className="rounded-full shadow-lg">
          <Check />
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Add this to your tailwind.config.ts if you don't have it
// theme: {
//   extend: {
//     backgroundImage: {
//       'grid-pattern': 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
//     },
//     backgroundSize: {
//       'grid-pattern': '20px 20px',
//     }
//   }
// }