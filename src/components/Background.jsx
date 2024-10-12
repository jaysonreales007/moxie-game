const Background = () => (
  <div className="fixed inset-0 -z-10">
    <svg
      className="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
          width={200}
          height={200}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)">
            <animate attributeName="offset" values="0;1" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="rgba(255,255,255,0)">
            <animate attributeName="offset" values="0;1" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
      
      {/* Animated flowing lines */}
      <g className="flowing-lines">
        <path d="M0 100 Q 250 50 500 100 T 1000 100" stroke="url(#flow-gradient)" strokeWidth="2" fill="none">
          <animate attributeName="d" 
            values="M0 100 Q 250 50 500 100 T 1000 100;
                    M0 100 Q 250 150 500 100 T 1000 100;
                    M0 100 Q 250 50 500 100 T 1000 100"
            dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M0 200 Q 250 150 500 200 T 1000 200" stroke="url(#flow-gradient)" strokeWidth="2" fill="none">
          <animate attributeName="d" 
            values="M0 200 Q 250 150 500 200 T 1000 200;
                    M0 200 Q 250 250 500 200 T 1000 200;
                    M0 200 Q 250 150 500 200 T 1000 200"
            dur="15s" repeatCount="indefinite" />
        </path>
        <path d="M0 300 Q 250 250 500 300 T 1000 300" stroke="url(#flow-gradient)" strokeWidth="2" fill="none">
          <animate attributeName="d" 
            values="M0 300 Q 250 250 500 300 T 1000 300;
                    M0 300 Q 250 350 500 300 T 1000 300;
                    M0 300 Q 250 250 500 300 T 1000 300"
            dur="20s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  </div>
);

export default Background;
