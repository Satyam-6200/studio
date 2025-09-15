"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export function UiAnimation() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 40 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-300, 300], [20, -20]);
  const rotateY = useTransform(smoothX, [-300, 300], [-360, 360]);

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
      
      <motion.div
        className="relative h-[400px] w-[640px] rounded-xl shadow-2xl bg-card/50 p-4 border border-border"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX,
          rotateY
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/20"></div>

        <motion.div 
            className="w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
        >
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
