import { PLAN_INFO } from '../data/kommoData'
import { formatBRL } from '../utils/calculations'

export default function ResultSummary({ result, form }) {
  const { plan, isCustom, pricePerUser, monthlyTotal, contractTotal, freeMonth, durationMonths, installmentValue } =
    result

  if (isCustom) {
    return (
      <section className="card card-highlight" style={{ marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Resultado
        </div>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--red)', marginBottom: 10 }}>Plano Empresarial</h2>
        <p style={{ color: 'var(--gray-300)', maxWidth: 520, lineHeight: 1.6 }}>
          Este plano é sob medida — os valores são definidos em consulta direta com a Kommo e a Stack Digital,
          conforme o volume de usuários e o escopo do projeto.
        </p>
      </section>
    )
  }

  return (
    <section className="card card-highlight" style={{ marginBottom: 32 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            Resultado · Plano {PLAN_INFO[plan].label}
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>
            {form.users} usuário{form.users > 1 ? 's' : ''} · {form.term} meses
          </h2>
        </div>
        {freeMonth && (
          <div className="badge">🎁 1 mês grátis incluso — Stack Digital</div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginBottom: freeMonth ? 20 : 0,
        }}
      >
        <Stat label="Valor mensal / usuário" value={formatBRL(pricePerUser)} />
        <Stat label="Valor mensal total" value={formatBRL(monthlyTotal)} big />
        <Stat label="Duração do contrato" value={`${durationMonths} meses`} sub={freeMonth ? `${form.term} pagos + 1 grátis` : undefined} />
        <Stat label="Valor total do contrato" value={formatBRL(contractTotal)} big red />
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid var(--border)',
        }}
      >
        {form.payment === 'avista' ? (
          <Stat
            label="Pagamento à vista"
            value={formatBRL(contractTotal)}
            sub="Boleto ou Pix"
          />
        ) : (
          <Stat
            label={`Parcelado em ${form.installments}x no cartão`}
            value={formatBRL(installmentValue)}
            sub={`${form.installments} parcelas de ${formatBRL(installmentValue)}`}
          />
        )}
      </div>

      {freeMonth && (
        <p style={{ fontSize: '0.76rem', color: 'var(--gray-500)', marginTop: 16, marginBottom: 0 }}>
          Benefício de 1 mês grátis válido exclusivamente para contratação ou renovação via Stack Digital.
        </p>
      )}
    </section>
  )
}

function Stat({ label, value, sub, big, red }) {
  return (
    <div>
      <label style={{ marginBottom: 6 }}>{label}</label>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: big ? 'clamp(1.6rem, 3vw, 2.1rem)' : '1.3rem',
          color: red ? 'var(--red)' : 'var(--white)',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '0.78rem', color: 'var(--gray-300)', marginTop: 4 }}>{sub}</div>
      )}
    </div>
  )
}
