export const TERMS = [6, 9, 12, 24]

export const PLAN_ORDER = ['basico', 'avancado', 'pro']

export const PLAN_INFO = {
  basico: {
    label: 'Básico',
    tagline: 'Pequenas equipes e recursos essenciais de IA',
  },
  avancado: {
    label: 'Avançado',
    tagline: 'Automação de chats com IA',
  },
  pro: {
    label: 'Pro',
    tagline: 'Automação avançada + agendamento + analytics',
  },
  empresarial: {
    label: 'Empresarial',
    tagline: 'Sob medida para operações de grande escala',
  },
}

// Preço por usuário/mês em BRL, por plano x prazo (meses)
export const DEFAULT_PRICE_TABLE = {
  basico: { 6: 77, 9: 69, 12: 64, 24: 58 },
  avancado: { 6: 129, 9: 115, 12: 107, 24: 97 },
  pro: { 6: 232, 9: 206, 12: 193, 24: 174 },
  empresarial: { 6: null, 9: null, 12: null, 24: null },
}

// Quantidade mínima de usuários para liberar 1 mês grátis (Stack Digital)
export const FREE_MONTH_MIN_USERS = {
  basico: 3,
  avancado: 2,
  pro: 2,
}

// O que cada plano ganha em relação ao plano imediatamente anterior
export const FEATURE_UPGRADES = {
  avancado: {
    from: 'basico',
    title: 'Avançado inclui tudo do Básico, mais:',
    items: [
      'Automação de funis',
      'Transmissão em massa',
      'Bots sem código',
      'Até 3 agentes de IA',
      'Sugestão de valor de campo com IA',
      'Detecção de mensagens perdidas',
    ],
  },
  pro: {
    from: 'avancado',
    title: 'Pro inclui tudo do Avançado, mais:',
    items: [
      'Página e link de agendamento',
      'Ativação de público (segmentos dinâmicos, sincronização com ads)',
      'Acompanhamento de ROI de campanhas',
      'Kit completo de IA (até 50 agentes de IA)',
      'Agendamento de consultas por IA',
      'Gestão de mensagens de voz por IA',
      'Análise de vendas e marketing',
    ],
  },
}

export const PAYMENT_METHODS = [
  { value: 'avista', label: 'À vista (Boleto ou Pix)' },
  { value: 'parcelado', label: 'Parcelado no Cartão de Crédito' },
]

export const CONDITIONS = [
  'Pagamento em reais (BRL), sem necessidade de pagar em dólar nem taxa de conversão.',
  'Suporte técnico prioritário da Stack Digital para configurações e dificuldades técnicas.',
  'Os preços seguem os valores oficiais da Kommo.',
  'A venda só é válida através da Stack Digital, via solicitação no formulário.',
  'A contratação direta pela ferramenta (fora da Stack Digital) elimina a comissão da unidade e as condições aqui apresentadas.',
]
