import { PLAN_INFO, PLAN_ORDER, TERMS } from '../data/kommoData'

export default function PriceConfigPanel({ open, onToggle, priceTable, onPriceChange, onReset, empresarialNote, onNoteChange }) {
  return (
    <section className="card" style={{ marginBottom: 24 }}>
      <button
        onClick={onToggle}
        style={{
          background: 'transparent',
          color: 'var(--white)',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span className="eyebrow">Configurar Preços</span>
        <span style={{ color: 'var(--gray-300)', fontSize: '0.8rem', fontWeight: 400 }}>
          {open ? 'Ocultar ▲' : 'Editar valores oficiais ▼'}
        </span>
      </button>

      {open && (
        <div style={{ marginTop: 20, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
            <thead>
              <tr>
                <th style={thStyle}>Plano</th>
                {TERMS.map((t) => (
                  <th key={t} style={thStyle}>
                    {t} meses
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...PLAN_ORDER, 'empresarial'].map((plan) => (
                <tr key={plan}>
                  <td style={{ ...tdStyle, fontWeight: 700 }}>{PLAN_INFO[plan].label}</td>
                  {TERMS.map((term) => (
                    <td key={term} style={tdStyle}>
                      {plan === 'empresarial' ? (
                        <span style={{ color: 'var(--gray-300)', fontSize: '0.85rem' }}>Sob medida</span>
                      ) : (
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={priceTable[plan][term] ?? ''}
                          onChange={(e) => onPriceChange(plan, term, Number(e.target.value))}
                          style={{ padding: '8px 10px' }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 16 }}>
            <label htmlFor="empresarial-note">Observação — plano Empresarial</label>
            <textarea
              id="empresarial-note"
              rows={2}
              value={empresarialNote}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Ex.: condições negociadas caso a caso conforme volume e escopo do cliente."
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 14,
            }}
          >
            <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', margin: 0 }}>
              Todos os valores em BRL, por usuário/mês. As alterações ficam salvas neste navegador.
            </p>
            <button
              type="button"
              onClick={onReset}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--gray-300)',
                fontSize: '0.74rem',
                padding: '8px 14px',
                borderRadius: 6,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Restaurar valores padrão
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

const thStyle = {
  textAlign: 'left',
  fontSize: '0.72rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--gray-300)',
  padding: '10px 12px',
  borderBottom: '1px solid var(--border)',
}

const tdStyle = {
  padding: '8px 12px',
  borderBottom: '1px solid var(--border)',
}
