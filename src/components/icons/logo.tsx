import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.1 2.2a.9.9 0 0 1 1.8 0l1.4 4.5a.9.9 0 0 0 .8.6l4.8.4a.9.9 0 0 1 .5 1.6l-3.6 3.2a.9.9 0 0 0-.3 1l1 4.7a.9.9 0 0 1-1.4 1l-4.2-2.4a.9.9 0 0 0-1 0l-4.2 2.4a.9.9 0 0 1-1.4-1l1-4.7a.9.9 0 0 0-.3-1l-3.6-3.2a.9.9 0 0 1 .5-1.6l4.8-.4a.9.9 0 0 0 .8-.6z" />
    </svg>
  );
}
