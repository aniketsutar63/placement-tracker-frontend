export function BoardingIllustration() {
  return (
    <svg
      className="gate-art-illustration"
      viewBox="0 0 360 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a boarding pass and a paper airplane rising over a dusk skyline"
    >
      {/* sun/horizon glow */}
      <circle cx="180" cy="190" r="70" fill="#ffb454" opacity="0.18" />
      <circle cx="180" cy="190" r="46" fill="#ffb454" opacity="0.28" />

      {/* skyline */}
      <g opacity="0.9">
        <rect x="18" y="150" width="26" height="90" rx="2" fill="#3a2560" />
        <rect x="52" y="120" width="22" height="120" rx="2" fill="#442a6e" />
        <rect x="82" y="165" width="18" height="75" rx="2" fill="#3a2560" />
        <rect x="262" y="140" width="20" height="100" rx="2" fill="#442a6e" />
        <rect x="290" y="170" width="26" height="70" rx="2" fill="#3a2560" />
        <rect x="322" y="155" width="18" height="85" rx="2" fill="#442a6e" />
      </g>

      {/* dashed flight path */}
      <path
        d="M40 210 C 100 90, 220 60, 300 40"
        fill="none"
        stroke="#fff8ef"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />

      {/* paper airplane */}
      <g transform="translate(288 34) rotate(18)">
        <path d="M0 0 L34 8 L0 26 L6 8 Z" fill="#fff8ef" />
        <path d="M0 0 L6 8 L0 26 Z" fill="#ffd9a8" />
      </g>

      {/* boarding pass ticket */}
      <g transform="translate(78 176)">
        <rect x="0" y="0" width="150" height="60" rx="8" fill="#fffaf2" />
        <rect x="0" y="0" width="150" height="60" rx="8" fill="none" stroke="#e8912a" strokeOpacity="0.4" />
        <circle cx="112" cy="30" r="14" fill="none" stroke="#e8912a" strokeOpacity="0.35" strokeDasharray="3 4" />
        <rect x="14" y="14" width="60" height="6" rx="3" fill="#7a3a8f" opacity="0.55" />
        <rect x="14" y="27" width="80" height="5" rx="2.5" fill="#8577a3" opacity="0.5" />
        <rect x="14" y="38" width="46" height="5" rx="2.5" fill="#8577a3" opacity="0.4" />
      </g>
    </svg>
  )
}

export function EmptyBoardIllustration() {
  return (
    <svg
      className="empty-illustration"
      viewBox="0 0 200 140"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of an empty departure board with a paper airplane"
    >
      <rect x="20" y="20" width="160" height="80" rx="10" fill="#7a3a8f" opacity="0.06" />
      <rect x="20" y="20" width="160" height="80" rx="10" fill="none" stroke="#7a3a8f" strokeOpacity="0.18" />
      <rect x="36" y="38" width="80" height="6" rx="3" fill="#8577a3" opacity="0.3" />
      <rect x="36" y="52" width="60" height="6" rx="3" fill="#8577a3" opacity="0.22" />
      <rect x="36" y="66" width="70" height="6" rx="3" fill="#8577a3" opacity="0.16" />
      <g transform="translate(120 60) rotate(-14)">
        <path d="M0 0 L40 9 L0 30 L7 9 Z" fill="#e8912a" opacity="0.85" />
        <path d="M0 0 L7 9 L0 30 Z" fill="#ffd9a8" />
      </g>
      <path
        d="M150 40 C 160 30, 168 30, 176 22"
        fill="none"
        stroke="#e8912a"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
    </svg>
  )
}
