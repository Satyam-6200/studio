
"use client";

import { useEffect, useRef } from 'react';

interface UIPreviewProps {
  html: string;
}

// Helper function to get all theme CSS variables from the document
const getThemeStyles = () => {
  // This function must run on the client side
  if (typeof window === 'undefined') {
    return '';
  }

  const rootStyle = getComputedStyle(document.documentElement);
  const themePrefixes = ['--', '--chart'];
  let cssText = ':root {\n';
  
  for (let i = 0; i < rootStyle.length; i++) {
    const propName = rootStyle[i];
    if (themePrefixes.some(prefix => propName.startsWith(prefix))) {
      cssText += `  ${propName}: ${rootStyle.getPropertyValue(propName)};\n`;
    }
  }

  cssText += '}';
  return cssText;
};

export function UIPreview({ html }: UIPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const themeStyles = getThemeStyles();
    
    const content = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              darkMode: 'class', // The iframe will respect the 'dark' class
              theme: {
                extend: {
                   colors: {
                    background: 'hsl(var(--background))',
                    foreground: 'hsl(var(--foreground))',
                    card: {
                      DEFAULT: 'hsl(var(--card))',
                      foreground: 'hsl(var(--card-foreground))',
                    },
                    popover: {
                      DEFAULT: 'hsl(var(--popover))',
                      foreground: 'hsl(var(--popover-foreground))',
                    },
                    primary: {
                      DEFAULT: 'hsl(var(--primary))',
                      foreground: 'hsl(var(--primary-foreground))',
                    },
                    secondary: {
                      DEFAULT: 'hsl(var(--secondary))',
                      foreground: 'hsl(var(--secondary-foreground))',
                    },
                    muted: {
                      DEFAULT: 'hsl(var(--muted))',
                      foreground: 'hsl(var(--muted-foreground))',
                    },
                    accent: {
                      DEFAULT: 'hsl(var(--accent))',
                      foreground: 'hsl(var(--accent-foreground))',
                    },
                    destructive: {
                      DEFAULT: 'hsl(var(--destructive))',
                      foreground: 'hsl(var(--destructive-foreground))',
                    },
                    border: 'hsl(var(--border))',
                    input: 'hsl(var(--input))',
                    ring: 'hsl(var(--ring))',
                    chart: {
                      '1': 'hsl(var(--chart-1))',
                      '2': 'hsl(var(--chart-2))',
                      '3': 'hsl(var(--chart-3))',
                      '4': 'hsl(var(--chart-4))',
                      '5': 'hsl(var(--chart-5))',
                    },
                  },
                   borderRadius: {
                    lg: 'var(--radius)',
                    md: 'calc(var(--radius) - 2px)',
                    sm: 'calc(var(--radius) - 4px)',
                  }
                }
              }
            }
          </script>
          <style>
            body { 
              margin: 0; 
              font-family: Inter, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            /* Inject the theme variables from the parent document */
            ${themeStyles}
          </style>
        </head>
        /* The 'dark' class enables dark mode, matching your app */
        <body class="dark bg-background">
          <div class="p-4">
            ${html}
          </div>
        </body>
      </html>
    `;
    
    // Use srcDoc for security and simplicity
    iframe.srcdoc = content;

  }, [html]);

  return (
    <div className="h-full w-full rounded-lg bg-card">
      <iframe
        ref={iframeRef}
        title="UI Preview"
        sandbox="allow-scripts" // Allow scripts for things like Tailwind JIT
        className="h-full w-full rounded-lg"
      />
    </div>
  );
}

    