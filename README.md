# Odd 100 Bilhete — LP Esportiva

LP de conversão máxima para campanha "Odd 100 na Esportiva", no mesmo formato da LP bilhete.mateuscaumo.com.br (topbar, hero com foto do Mateus, 3 passos, CTA fixo) em paleta laranja. Redireciona o lead pro WhatsApp após ~1s de loading (garante o pageview + evento Lead do Pixel).

## Stack

- Next 15 (App Router)
- Estática (deploy Vercel sem overhead)
- CSS-in-JS via `styled-jsx` (nativo do Next)
- Fontes Anton / Barlow / Russo One via `next/font/google` (baixadas no build, sem request externo em runtime)
- Tela única sem rolagem: o hero é o único bloco elástico; em telas < 680px de altura as descrições dos passos e o texto legal somem
- Sem Tailwind, sem lib de UI — máxima leveza

## ⚙️ Ajustar antes de deployar

Abre `app/page.tsx` e edita as 3 constantes no topo:

```typescript
const OFERTAS = [
  { id: 1, link: "https://wa.link/s8vnpg" },
  { id: 2, link: "https://wa.link/hgodgk" },
  { id: 3, link: "https://wa.link/tggx72" },
  { id: 4, link: "https://wa.link/huy6or" },
];
const LOADING_MS = 1000; // tempo do loading antes do redirect
```

## Teste de 4 ofertas (split 25% cada)

Cada link wa.link abre o WhatsApp com uma mensagem diferente, que é o gatilho do fluxo na automação. A LP distribui os leads assim:

1. `?oferta=N` na URL força a oferta N (pra testar cada fluxo)
2. Se o navegador já sorteou antes, repete a mesma oferta (`localStorage`, chave `odd100_oferta`)
3. Senão sorteia uma das 4 com chance igual e grava

O evento `Lead` do Pixel vai com `content_name: "Bilhete Odd 100 - Oferta N"` e `content_category: "oferta_N"`, então dá pra quebrar por oferta no Gerenciador. O sorteio é no navegador: ao longo do volume converge pra 25% cada, mas não é uma fila exata.

Pra trocar a foto do hero, substitua `public/caumo.webp` (900px de largura, recortada logo acima da cabeça).

## Como funciona

1. Usuário chega na LP (tráfego pago Meta)
2. Vê a foto do Mateus com a headline "BILHETE ODD 100 / TÁ LIBERADO" e os 3 passos
3. Clica no botão laranja fixo "PEGAR O BILHETE NO WHATSAPP"
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
