"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const Showcase = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 100, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-headline text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-4">
          See the Magic in Action
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-center text-muted-foreground">
          Hover over the showcase below to see how our AI can transform your ideas into stunning, interactive user interfaces.
        </p>
      </div>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-[40rem] w-full max-w-5xl mx-auto mt-12"
      >
        <div
          style={{
            transform: 'translateZ(8px)',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-4 rounded-lg border-2 border-dashed border-primary/50 bg-background p-4"
        >
          {PlaceHolderImages.slice(0, 4).map((image, i) => (
             <motion.div
              key={image.id}
              style={{
                transform: 'translateZ(20px)',
                transformStyle: 'preserve-3d',
              }}
              className="relative aspect-video w-full h-full rounded-md overflow-hidden"
            >
                <Image 
                    src={image.imageUrl} 
                    alt={image.description} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                />
             </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
