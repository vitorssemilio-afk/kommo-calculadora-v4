import { PLAN_INFO, PLAN_ORDER, TERMS, PAYMENT_METHODS } from '../data/kommoData'

export default function InputsPanel({ form, onChange }) {
  const selectablePlans = [...PLAN_ORDER, 'empresarial']

  return (
    <section className="card" style={{ marginBottom: 24 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>
        Configuração da Proposta
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
        }}
      >
        <div>
          <label htmlFor="users">Quantidade de usuários</label>
          <input
            id="users"
            type="number"
            min={1}
            value={form.users}
            onChange={(e) => onChange({ users: Math.max(1, Number(e.target.value) || 1) })}
          />
        </div>

        <div>
          <label htmlFor="plan">Plano</label>
          <select id="plan" value={form.plan} onChange={(e) => onChange({ plan: e.target.value })}>
            {selectablePlans.map((p) => (
              <option key={p} value={p}>
                {PLAN_INFO[p].label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="term">Prazo de assinatura</label>
          <select
            id="term"
            value={form.term}
            onChange={(e) => onChange({ term: Number(e.target.value) })}
          >
            {TERMS.map((t) => (
              <option key={t} value={t}>
                {t} meses
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="payment">Forma de pagamento</label>
          <select
            id="payment"
            value={form.payment}
            onChange={(e) => onChange({ payment: e.target.value })}
          >
            {PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {form.payment === 'parcelado' && (
          <div>
            <label htmlFor="installments">Quantidade de parcelas</label>
            <select
              id="installments"
              value={form.installments}
              onChange={(e) => onChange({ installments: Number(e.target.value) })}
            >
              {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
                <option key={n} value={n}>
                  {n}x
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <p
        style={{
          marginTop: 18,
          marginBottom: 0,
          fontSize: '0.82rem',
          color: 'var(--gray-300)',
          lineHeight: 1.5,
        }}
      >
        {PLAN_INFO[form.plan].tagline}
      </p>
    </section>
  )
}
