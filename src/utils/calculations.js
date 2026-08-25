import { FREE_MONTH_MIN_USERS } from '../data/kommoData'

export function isFreeMonthEligible(plan, users) {
  const min = FREE_MONTH_MIN_USERS[plan]
  if (!min) return false
  return users >= min
}

/**
 * Calcula o resultado comercial para um plano específico.
 * O mês grátis estende a duração do contrato sem alterar o valor total pago.
 */
export function calculatePlan({ plan, users, term, priceTable, installments }) {
  const pricePerUser = priceTable?.[plan]?.[term] ?? null
  if (pricePerUser === null || pricePerUser === undefined) {
    return {
      plan,
      isCustom: true,
      pricePerUser: null,
      monthlyTotal: null,
      contractTotal: null,
      freeMonth: false,
      durationMonths: term,
      installmentValue: null,
    }
  }

  const freeMonth = isFreeMonthEligible(plan, users)
  const monthlyTotal = pricePerUser * users
  const contractTotal = monthlyTotal * term
  const durationMonths = term + (freeMonth ? 1 : 0)
  const installmentValue = installments ? contractTotal / installments : null

  return {
    plan,
    isCustom: false,
    pricePerUser,
    monthlyTotal,
    contractTotal,
    freeMonth,
    durationMonths,
    installmentValue,
  }
}

export function formatBRL(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}
