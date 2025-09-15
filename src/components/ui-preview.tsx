"use client";

import { useEffect, useState } from 'react';

interface UIPreviewProps {
  html: string;
}

export function UIPreview({ html }: UIPreviewProps) {
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    // This function now runs on the client, so it can access `window`
    const getThemeStyles = () => {
      if (typeof window === 'undefined') return '';
      // Extract CSS variables from the document's :root
      const rootStyle = getComputedStyle(document.documentElement);
      const cssVars: { [key: string]: string } = {};
      const themePrefixes = ['--', '--chart']; // Prefixes for variables we want to capture
      
      for (let i = 0; i < rootStyle.length; i++) {
        const propName = rootStyle[i];
        if (themePrefixes.some(prefix => propName.startsWith(prefix))) {
          cssVars[propName] = rootStyle.getPropertyValue(propName);
        }
      }

      // Generate the CSS string
      const darkThemeCss = Object.entries(cssVars)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n');
      
      return `.dark {\n${darkThemeCss}\n}`;
    };

    const themeStyles = getThemeStyles();
    
    const content = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              darkMode: 'class', // Enable dark mode
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
                }
              }
            }
          </script>
          <style>
            body { margin: 0; font-family: sans-serif; }
            ${themeStyles}
          </style>
        </head>
        <body class="dark bg-background">
          <div class="p-4">
            ${html}
          </div>
        </body>
      </html>
    `;
    setIframeContent(content);
  }, [html]);

  return (
    <div className="h-full w-full rounded-lg bg-card">
      <iframe
        srcDoc={iframeContent}
        title="UI Preview"
        sandbox="allow-scripts"
        className="h-full w-full rounded-lg"
      />
    </div>
  );
}
