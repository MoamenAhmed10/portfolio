export function createImagePlaceholder(
  label: string,
  accent = '#667eea',
  secondary = '#1a1f36',
): string {
  const safeLabel = label.trim().slice(0, 24) || 'Portfolio';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${secondary}" />
          <stop offset="100%" stop-color="#0f1220" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#9b8cff" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" rx="48" />
      <circle cx="980" cy="120" r="180" fill="${accent}" fill-opacity="0.18" />
      <circle cx="180" cy="680" r="220" fill="#ffffff" fill-opacity="0.05" />
      <rect x="120" y="120" width="520" height="22" rx="11" fill="#ffffff" fill-opacity="0.12" />
      <rect x="120" y="170" width="360" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="120" y="214" width="430" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="120" y="268" width="280" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="120" y="360" width="960" height="300" rx="34" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.08" />
      <rect x="168" y="410" width="240" height="18" rx="9" fill="url(#accent)" fill-opacity="0.9" />
      <text x="168" y="510" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">${safeLabel}</text>
      <text x="168" y="570" fill="#c9d1ff" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="400">Portfolio Preview</text>
      <circle cx="930" cy="490" r="110" fill="url(#accent)" fill-opacity="0.20" />
      <circle cx="930" cy="490" r="58" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="18" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
