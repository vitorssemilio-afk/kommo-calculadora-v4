const API_URL = '/api/prices'

export async function fetchRemoteState() {
  const res = await fetch(API_URL, { method: 'GET' })
  if (!res.ok) throw new Error(`Falha ao buscar preços (${res.status})`)
  return res.json()
}

export async function pushRemoteState(priceTable, empresarialNote) {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceTable, empresarialNote }),
  })
  if (!res.ok) throw new Error(`Falha ao salvar preços (${res.status})`)
  return res.json()
}
