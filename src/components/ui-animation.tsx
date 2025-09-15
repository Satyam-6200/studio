"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function UiAnimation() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-[400px] w-[640px] rounded-xl shadow-2xl bg-card/50 p-4 border border-border overflow-hidden"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        <video 
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        ></video>
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/20"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-grid-pattern opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]"></div>
        
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
      </motion.div>
    </div>
  );
}
