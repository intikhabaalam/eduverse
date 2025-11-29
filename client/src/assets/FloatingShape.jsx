// UI Only — Decorative SVG components

export const CircleShape = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="url(#gradient1)" opacity="0.6" />
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C4DFF" />
        <stop offset="50%" stopColor="#FF6FD8" />
        <stop offset="100%" stopColor="#00E1FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const SquiggleShape = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 100 Q 50 50, 80 100 T 140 100 T 180 100"
      stroke="url(#gradient2)"
      strokeWidth="8"
      strokeLinecap="round"
      opacity="0.7"
    />
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#06D6A0" />
      </linearGradient>
    </defs>
  </svg>
);

export const TriangleShape = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100 20 L180 180 L20 180 Z"
      fill="url(#gradient3)"
      opacity="0.5"
    />
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6FD8" />
        <stop offset="100%" stopColor="#7C4DFF" />
      </linearGradient>
    </defs>
  </svg>
);

export const StarShape = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100 20 L120 80 L180 80 L135 115 L155 175 L100 140 L45 175 L65 115 L20 80 L80 80 Z"
      fill="url(#gradient4)"
      opacity="0.6"
    />
    <defs>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#00E1FF" />
      </linearGradient>
    </defs>
  </svg>
);
