import { useMemo, useState } from 'react'
import Header from './components/Header'
import InputsPanel from './components/InputsPanel'
import PriceConfigPanel from './components/PriceConfigPanel'
import ResultSummary from './components/ResultSummary'
import ComparisonSection from './components/ComparisonSection'
import ConditionsFooter from './components/ConditionsFooter'
import SummaryView from './components/SummaryView'
import { DEFAULT_PRICE_TABLE } from './data/kommoData'
import { calculatePlan } from './utils/calculations'

const INITIAL_FORM = {
  users: 5,
  plan: 'avancado',
  term: 12,
  payment: 'avista',
  installments: 3,
}

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [priceTable, setPriceTable] = useState(DEFAULT_PRICE_TABLE)
  const [empresarialNote, setEmpresarialNote] = useState('')
  const [priceConfigOpen, setPriceConfigOpen] = useState(false)
  const [summaryMode, setSummaryMode] = useState(false)

  const handleFormChange = (patch) => setForm((prev) => ({ ...prev, ...patch }))

  const handlePriceChange = (plan, term, value) => {
    setPriceTable((prev) => ({
      ...prev,
      [plan]: { ...prev[plan], [term]: value },
    }))
  }

  const result = useMemo(
    () =>
      calculatePlan({
        plan: form.plan,
        users: form.users,
        term: form.term,
        priceTable,
        installments: form.payment === 'parcelado' ? form.installments : null,
      }),
    [form, priceTable],
  )

  if (summaryMode) {
    return <SummaryView result={result} form={form} onBack={() => setSummaryMode(false)} />
  }

  return (
    <div className="app">
      <Header />

      <InputsPanel form={form} onChange={handleFormChange} />

      <PriceConfigPanel
        open={priceConfigOpen}
        onToggle={() => setPriceConfigOpen((o) => !o)}
        priceTable={priceTable}
        onPriceChange={handlePriceChange}
        empresarialNote={empresarialNote}
        onNoteChange={setEmpresarialNote}
      />

      <ResultSummary result={result} form={form} />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <button
          onClick={() => setSummaryMode(true)}
          style={{
            background: 'var(--red)',
            color: 'var(--white)',
            padding: '14px 32px',
            fontSize: '0.9rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: 8,
          }}
        >
          Gerar Resumo
        </button>
      </div>

      <ComparisonSection form={form} priceTable={priceTable} />

      <ConditionsFooter />
    </div>
  )
}
