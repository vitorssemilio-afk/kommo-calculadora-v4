import { CONDITIONS } from '../data/kommoData'

export default function ConditionsFooter() {
  return (
    <section className="card" style={{ marginBottom: 24 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>
        Condições Comerciais
      </div>
      <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--gray-300)', fontSize: '0.88rem', lineHeight: 1.9 }}>
        {CONDITIONS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  )
}
