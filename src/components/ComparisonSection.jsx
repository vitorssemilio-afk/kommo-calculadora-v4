import { FEATURE_UPGRADES, PLAN_INFO, PLAN_ORDER } from '../data/kommoData'
import { calculatePlan, formatBRL, formatPercent, isFreeMonthEligible } from '../utils/calculations'

export default function ComparisonSection({ form, priceTable }) {
  const results = PLAN_ORDER.map((plan) =>
    calculatePlan({
      plan,
      users: form.users,
      term: form.term,
      priceTable,
      installments: form.payment === 'parcelado' ? form.installments : null,
    }),
  )

  return (
    <section style={{ marginBottom: 32 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>
        Comparativo de Planos
      </div>
      <h3 style={{ fontSize: '1.3rem', marginBottom: 20 }}>
        {form.users} usuários · {form.term} meses
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}
      >
        {results.map((r, idx) => {
          const prev = idx > 0 ? results[idx - 1] : null
          const diff = prev && r.monthlyTotal !== null && prev.monthlyTotal !== null
            ? r.monthlyTotal - prev.monthlyTotal
            : null
          const diffPct = prev && diff !== null && prev.monthlyTotal
            ? (diff / prev.monthlyTotal) * 100
            : null
          const isSelected = r.plan === form.plan
          const upgrade = FEATURE_UPGRADES[r.plan]
          const freeMonthMin = isFreeMonthEligible(r.plan, form.users)

          return (
            <div
              key={r.plan}
              className={`card${isSelected ? ' card-highlight' : ''}`}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 4,
                }}
              >
                <h4 style={{ fontSize: '1.1rem' }}>{PLAN_INFO[r.plan].label}</h4>
                {isSelected && (
                  <span style={{ fontSize: '0.68rem', color: 'var(--red)', fontWeight: 700, letterSpacing: '0.06em' }}>
                    SELECIONADO
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-300)', marginTop: 0, marginBottom: 18 }}>
                {PLAN_INFO[r.plan].tagline}
              </p>

              <div style={{ marginBottom: 6 }}>
                <label style={{ marginBottom: 4 }}>Valor mensal total</label>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>
                  {formatBRL(r.monthlyTotal)}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ marginBottom: 4 }}>Valor total do contrato</label>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--red)' }}>
                  {formatBRL(r.contractTotal)}
                </div>
              </div>

              {freeMonthMin && (
                <div className="badge" style={{ alignSelf: 'flex-start', marginBottom: 14 }}>
                  1 mês grátis
                </div>
              )}

              {prev && diff !== null && (
                <p style={{ fontSize: '0.78rem', color: 'var(--gray-300)', marginBottom: 16 }}>
                  <strong style={{ color: 'var(--white)' }}>+{formatBRL(diff)}</strong>
                  {' '}
                  ({formatPercent(diffPct)}) vs. {PLAN_INFO[prev.plan].label}/mês
                </p>
              )}

              {upgrade && (
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
                    {upgrade.title}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.78rem', color: 'var(--gray-300)', lineHeight: 1.7 }}>
                    {upgrade.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
