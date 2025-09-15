"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

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
        perspective: "1000px",
      }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"></div>
      
      <motion.div
        className="relative h-96 w-96 rounded-xl shadow-2xl"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        whileHover={{ scale: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10, mass: 0.5 }}
      >
        <Image
          src="https://picsum.photos/seed/ai-ui-design/800/800"
          alt="Interactive UI"
          fill
          className="rounded-xl object-cover"
          data-ai-hint="AI UI design"
        />
        <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
                transform: "translateZ(40px)",
                boxShadow: "0 0 50px 10px hsl(var(--primary) / 0.3)",
            }}
        />
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