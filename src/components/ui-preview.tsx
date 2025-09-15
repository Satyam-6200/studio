"use client";

import { useEffect, useState } from 'react';

interface UIPreviewProps {
  html: string;
  css: string;
}

export function UIPreview({ html, css }: UIPreviewProps) {
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    const content = `
      <html>
        <head>
          <style>
            body { margin: 0; font-family: sans-serif; }
            ${css}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
    setIframeContent(content);
  }, [html, css]);

  return (
    <div className="h-full w-full rounded-lg bg-white">
      <iframe
        srcDoc={iframeContent}
        title="UI Preview"
        sandbox="allow-scripts"
        className="h-full w-full rounded-lg"
      />
    </div>
  );
}
