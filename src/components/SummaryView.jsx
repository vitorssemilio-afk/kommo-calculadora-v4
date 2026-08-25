import { CONDITIONS, PLAN_INFO } from '../data/kommoData'
import { formatBRL } from '../utils/calculations'
import Logo from './Logo'

export default function SummaryView({ result, form, onBack }) {
  const { pricePerUser, monthlyTotal, contractTotal, freeMonth, durationMonths, installmentValue, isCustom } = result

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
      <button
        onClick={onBack}
        className="no-print"
        style={{
          background: 'transparent',
          color: 'var(--gray-300)',
          padding: '8px 0',
          marginBottom: 24,
          fontSize: '0.85rem',
        }}
      >
        ← Voltar para a calculadora
      </button>

      <div className="card card-highlight" style={{ padding: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <Logo size={32} />
        </div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          Proposta Comercial Kommo
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: 6 }}>
          Plano {PLAN_INFO[form.plan].label}
        </h1>
        <p style={{ color: 'var(--gray-300)', marginBottom: 28 }}>
          {form.users} usuário{form.users > 1 ? 's' : ''} · {form.term} meses de contrato
        </p>

        {isCustom ? (
          <p style={{ color: 'var(--gray-300)', lineHeight: 1.7 }}>
            Plano Empresarial — valores sob consulta, definidos conforme volume de usuários e escopo do projeto.
          </p>
        ) : (
          <>
            {freeMonth && (
              <div className="badge" style={{ marginBottom: 24 }}>
                🎁 1 mês grátis incluso — Stack Digital
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 24,
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: '1px solid var(--border)',
              }}
            >
              <Row label="Valor mensal / usuário" value={formatBRL(pricePerUser)} />
              <Row label="Valor mensal total" value={formatBRL(monthlyTotal)} />
              <Row label="Duração do contrato" value={`${durationMonths} meses`} />
              <Row label="Valor total do contrato" value={formatBRL(contractTotal)} highlight />
            </div>

            <div style={{ marginBottom: 28 }}>
              {form.payment === 'avista' ? (
                <Row label="Pagamento" value={`${formatBRL(contractTotal)} à vista (Boleto ou Pix)`} highlight />
              ) : (
                <Row
                  label="Pagamento parcelado"
                  value={`${form.installments}x de ${formatBRL(installmentValue)}`}
                  highlight
                />
              )}
            </div>
          </>
        )}

        <div style={{ paddingTop: 4 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Condições
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--gray-300)', fontSize: '0.82rem', lineHeight: 1.8 }}>
            {CONDITIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }) {
  return (
    <div>
      <label style={{ marginBottom: 6 }}>{label}</label>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: highlight ? '1.6rem' : '1.2rem',
          color: highlight ? 'var(--red)' : 'var(--white)',
        }}
      >
        {value}
      </div>
    </div>
  )
}
