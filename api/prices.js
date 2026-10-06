import { Redis } from '@upstash/redis'

const PRICE_TABLE_KEY = 'kommo:price-table'
const NOTE_KEY = 'kommo:empresarial-note'

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

const redis = url && token ? new Redis({ url, token }) : null

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (!redis) {
    res.status(500).json({
      error: 'Banco de dados não configurado (variáveis KV_REST_API_URL / KV_REST_API_TOKEN ausentes).',
    })
    return
  }

  try {
    if (req.method === 'GET') {
      const [priceTable, empresarialNote] = await Promise.all([
        redis.get(PRICE_TABLE_KEY),
        redis.get(NOTE_KEY),
      ])
      res.status(200).json({ priceTable: priceTable ?? null, empresarialNote: empresarialNote ?? '' })
      return
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { priceTable, empresarialNote } = body ?? {}

      await Promise.all([
        priceTable !== undefined ? redis.set(PRICE_TABLE_KEY, priceTable) : null,
        empresarialNote !== undefined ? redis.set(NOTE_KEY, empresarialNote) : null,
      ])

      res.status(200).json({ ok: true })
      return
    }

    res.setHeader('Allow', 'GET, PUT')
    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    res.status(500).json({ error: error?.message ?? 'Erro desconhecido' })
  }
}
