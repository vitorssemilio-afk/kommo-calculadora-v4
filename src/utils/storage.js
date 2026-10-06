const STORAGE_KEY = 'kommo-calculadora:price-table'
const NOTE_STORAGE_KEY = 'kommo-calculadora:empresarial-note'

export function loadPriceTable(defaultTable) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTable
    const stored = JSON.parse(raw)
    const merged = {}
    for (const plan of Object.keys(defaultTable)) {
      merged[plan] = { ...defaultTable[plan], ...stored[plan] }
    }
    return merged
  } catch {
    return defaultTable
  }
}

export function savePriceTable(priceTable) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(priceTable))
  } catch {
    // localStorage indisponível (modo privado, quota excedida, etc.) — ignora
  }
}

export function loadEmpresarialNote() {
  try {
    return localStorage.getItem(NOTE_STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveEmpresarialNote(note) {
  try {
    localStorage.setItem(NOTE_STORAGE_KEY, note)
  } catch {
    // ignora
  }
}
