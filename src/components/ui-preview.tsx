"use client";

import { useEffect, useState } from 'react';

interface UIPreviewProps {
  html: string;
}

export function UIPreview({ html }: UIPreviewProps) {
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    const content = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div class="p-4">
            ${html}
          </div>
        </body>
      </html>
    `;
    setIframeContent(content);
  }, [html]);

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
