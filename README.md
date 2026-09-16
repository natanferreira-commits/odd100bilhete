# Odd 100 Bilhete — LP Esportiva

LP de conversão máxima para campanha "Odd 100 na Esportiva". Redireciona o lead pro WhatsApp após ~1s de loading (garante o pageview + evento eventual do Pixel).

## Stack

- Next 15 (App Router)
- Estática (deploy Vercel sem overhead)
- CSS-in-JS via `styled-jsx` (nativo do Next)
- Sem Tailwind, sem lib de UI — máxima leveza

## ⚙️ Ajustar antes de deployar

Abre `app/page.tsx` e edita as 3 constantes no topo:

```typescript
const WHATSAPP_NUMERO = "5511999999999"; // ← teu número (E.164, sem +)
const WHATSAPP_MENSAGEM = "Oi! Quero pegar a odd 100 da Esportiva 🎯";
const LOADING_MS = 1000; // tempo do loading antes do redirect
```

## Como funciona

1. Usuário chega na LP (tráfego pago Meta)
2. Vê a headline gigante "ODD 100 no bilhete de hoje"
3. Clica no botão laranja "QUERO PEGAR AGORA"
4. Botão vira loading ("Preparando teu bilhete…") por 1s
5. Redireciona pro `wa.me/[NUMERO]?text=[MENSAGEM]` — abre WhatsApp com msg pré-preenchida
6. Comercial responde no WhatsApp, coleta dados e joga link do bilhete na casa (Esportiva)

## Rodar local

```bash
npm install
npm run dev
```

## Deploy

Aponta pra este repo no Vercel. Sem env vars obrigatórias (tudo hardcoded no `page.tsx`).

## Notas

- **Compliance:** rodapé com "+18 · Aposte com responsabilidade" + adverso do Ministério da Fazenda
- **SEO:** `robots: noindex, nofollow` (é LP de campanha paga, não quer aparecer no Google)
- **Mobile-first:** headline usa `clamp()` pra escalar em qualquer tela
- **Loading obrigatório:** garante ~1s de tempo em página, importante pra tracking (Meta Pixel dispara PageView antes do redirect)

## Estrutura

```
odd100bilhete/
├── app/
│   ├── layout.tsx      # Meta tags, viewport, theme-color
│   ├── page.tsx        # LP única (client component)
│   └── globals.css     # Reset + base
├── package.json
├── tsconfig.json
├── next.config.mjs
└── .gitignore
```

## Próximos passos possíveis

- Meta Pixel + CAPI (pra rastrear conversão real)
- A/B da headline (rodar 2-3 versões)
- Adicionar logo Esportiva se rolar autorização
- UTM tracking pra saber de qual criativo veio cada lead
