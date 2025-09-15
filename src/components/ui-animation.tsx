"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export function UiAnimation() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * width);
    y.set(yPct * height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  return (
    <div
      className="relative hidden h-[500px] w-full max-w-lg items-center justify-center lg:flex"
      style={{
        perspective: "1000px",
      }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"></div>
      
      <motion.div
        className="relative h-[400px] w-[640px] rounded-xl shadow-2xl bg-card/50 p-4 border border-border"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX,
          rotateY
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 350, damping: 40 }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{backgroundImage: "url('https://picsum.photos/seed/wavy/1280/800')"}}
          data-ai-hint="wavy abstract"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/20"></div>

        <motion.div 
            className="w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.div 
                className="relative h-64 w-64"
                style={{ transform: "translateZ(80px)" }}
            >
                <Image
                src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhaXxlbnwwfHx8fDE3NTc5Njc5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Brain"
                fill
                className="object-contain"
                data-ai-hint="AI brain"
                />
            </motion.div>
            
            <motion.div 
                className="absolute top-8 left-8 text-left"
                style={{ transform: "translateZ(60px)" }}
            >
                <h2 className="font-headline text-3xl font-bold">CORRECTED UI</h2>
                <p className="text-primary text-lg">Beyond Imagination</p>
            </motion.div>

             <motion.div 
                className="absolute bottom-8 right-8 text-right text-muted-foreground"
                style={{ transform: "translateZ(40px)" }}
            >
                <p>AI Powered UI/UX</p>
                <p>Design & Development</p>
            </motion.div>
        </motion.div>
        
        <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
                transform: "translateZ(100px)",
                boxShadow: "0 0 80px 20px hsl(var(--primary) / 0.25)",
            }}
        />
      </motion.div>
    </div>
  );
}
