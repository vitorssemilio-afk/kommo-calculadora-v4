# Calculadora Kommo — Stack Digital

App web (React + Vite) para simular valor mensal e total de contratos Kommo CRM durante negociações comerciais da Stack Digital.

## Funcionalidades

- Cálculo por quantidade de usuários, plano (Básico/Avançado/Pro/Empresarial), prazo (6/9/12/24 meses) e forma de pagamento (à vista ou parcelado).
- Regra automática de 1 mês grátis por volume de usuários (Básico: 3+, Avançado/Pro: 2+).
- Painel "Configurar Preços" para editar a tabela oficial de valores por usuário/mês.
- Comparativo lado a lado dos planos Básico, Avançado e Pro, com diferença de preço e ganho de funcionalidades entre eles.
- Botão "Gerar Resumo" com uma visão limpa da proposta, pronta para print/captura de tela.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```
