import Logo from './Logo'

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 40,
        paddingBottom: 24,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div>
        <div style={{ marginBottom: 16 }}>
          <Logo size={36} />
        </div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          Parceira Oficial Kommo
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
          Calculadora <span style={{ color: 'var(--red)' }}>Kommo</span>
        </h1>
      </div>
      <p style={{ color: 'var(--gray-300)', maxWidth: 380, fontSize: '0.9rem', margin: 0 }}>
        Monte a proposta comercial em tempo real durante a negociação com o cliente.
      </p>
    </header>
  )
}
