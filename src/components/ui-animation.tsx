"use client";

import { motion } from "framer-motion";

export function UiAnimation() {
  return (
    <motion.div
      className="relative hidden h-full w-full items-center justify-center overflow-hidden rounded-lg lg:flex"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://storage.googleapis.com/studio-design-assets/studio-builder-ui-animation.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
