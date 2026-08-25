export default function Logo({ size = 40, withWordmark = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="10" fill="#141414" stroke="#3D3D3D" />
        <path d="M10 30.5 L24 22 L38 30.5" stroke="#3D3D3D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 24 L24 15.5 L38 24" stroke="#FF0000" strokeOpacity="0.45" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 17.5 L24 9 L38 17.5" stroke="#FF0000" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {withWordmark && (
        <div style={{ lineHeight: 1, fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
          <div style={{ fontSize: '1.05rem', letterSpacing: '0.02em' }}>
            Stack<span style={{ color: 'var(--red)' }}>Digital</span>
          </div>
        </div>
      )}
    </div>
  )
}
