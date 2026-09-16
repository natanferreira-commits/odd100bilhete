"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ============================================================
// CONFIG — Ajustar antes de deployar
// ============================================================
const WHATSAPP_URL = "https://wa.me/559180194075?text=QUERO%20O%20BILHETE";
const LOADING_MS = 1000; // tempo do loading antes de redirecionar
// ============================================================

function WhatsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2A9.9 9.9 0 0 0 2.05 11.9c0 1.75.46 3.45 1.34 4.96L2 22l5.3-1.38a10 10 0 0 0 4.7 1.19h.01A9.95 9.95 0 0 0 22 11.9 9.9 9.9 0 0 0 12 2Zm5.83 14.12c-.25.69-1.44 1.32-1.99 1.4-.51.08-1.15.11-1.86-.12-.43-.13-.98-.31-1.68-.61-2.96-1.28-4.89-4.25-5.04-4.45-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.29.59-.37.78-.37h.56c.18.01.42-.07.66.5.25.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.12.07.72-.18 1.41Z"
      />
    </svg>
  );
}

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);

    // Dispara evento Lead no Meta Pixel antes do redirect
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", { content_name: "Bilhete Odd 100 WhatsApp" });
    }

    setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, LOADING_MS);
  };

  return (
    <div className="wrap">
      {/* Topbar */}
      <div className="topbar">
        <span className="live" /> Bilhete odd 100 já está no WhatsApp
      </div>

      {/* Hero elástico com a foto do Mateus */}
      <header className="hero">
        <div className="hero-bg">
          <img
            src="/caumo.webp"
            alt="Mateus Caumo, analista esportivo"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-inner">
          <h1>
            BILHETE ODD 100
            <br />
            <span className="hl">TÁ LIBERADO</span>
          </h1>
        </div>
      </header>

      {/* Passo a passo */}
      <section className="sec" aria-label="Como pegar o bilhete em 3 passos">
        <h2 className="sec-t">Como pegar em 3 passos</h2>
        <ol className="steps">
          <li className="step">
            <span className="n" aria-hidden="true">1</span>
            <span className="tx">
              <b>Chame no WhatsApp</b>
              <span>Toque no botão aqui embaixo. É grátis e leva segundos.</span>
            </span>
          </li>
          <li className="step">
            <span className="n" aria-hidden="true">2</span>
            <span className="tx">
              <b>Peça o bilhete odd 100</b>
              <span>A equipe do Caumo te responde na hora com o bilhete do dia.</span>
            </span>
          </li>
          <li className="step prize">
            <span className="n" aria-hidden="true">3</span>
            <span className="tx">
              <b>Copie e aposte</b>
              <span>Você recebe o bilhete já montado, com todas as seleções. É só copiar.</span>
            </span>
          </li>
        </ol>

        <p className="responsible">
          <span className="age">+18</span> Aposte com responsabilidade
        </p>
        <p className="fazenda">
          O Ministério da Fazenda adverte: aposta não é investimento.
        </p>

        <p className="footer">
          Apostas são destinadas a maiores de 18 anos e podem causar dependência.
          Não são fonte de renda nem solução para problemas financeiros. Nunca
          aposte valores que não pode perder. Conteúdo informativo, sem garantia de
          resultados. Odds sujeitas a alteração pela casa. Site não afiliado ao
          Facebook, Instagram ou Meta Platforms, Inc.
        </p>
      </section>

      {/* CTA — última faixa, sempre visível sem rolar */}
      <div className="cta-bar">
        <button
          className={`cta ${loading ? "loading" : ""}`}
          onClick={handleClick}
          disabled={loading}
          aria-label="Falar no WhatsApp e pegar o bilhete"
        >
          {loading ? (
            <>
              <span className="spinner" />
              <span>Preparando teu bilhete…</span>
            </>
          ) : (
            <>
              <WhatsIcon />
              <span>Pegar o bilhete no WhatsApp</span>
            </>
          )}
        </button>
        <span className="cta-legal">Grátis · +18 · Aposte com responsabilidade</span>
      </div>

      <style jsx>{`
        /* A tela inteira é uma coluna que cabe no viewport, sem rolagem.
           O hero é o único elemento elástico: ele absorve a sobra. */
        .wrap {
          max-width: 480px;
          margin: 0 auto;
          height: 100vh;
          height: 100svh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .wrap > * {
          flex: 0 0 auto;
        }

        /* Topbar */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 36px;
          padding: 8px 16px;
          background: rgba(11, 9, 6, 0.9);
          border-bottom: 1px solid var(--border);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--text);
          text-align: center;
        }
        .live {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--orange);
          flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.6);
          animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          0% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.55); }
          70% { box-shadow: 0 0 0 9px rgba(255, 106, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); }
        }

        /* Hero elástico */
        .wrap > .hero {
          flex: 1 1 auto;
          min-height: 132px;
          position: relative;
          overflow: hidden;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 20px 20px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          opacity: 1;
        }
        .hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(70% 50% at 50% 45%, rgba(255, 106, 0, 0.1), transparent 70%),
            linear-gradient(
              180deg,
              rgba(11, 9, 6, 0.05) 0%,
              rgba(11, 9, 6, 0.12) 45%,
              rgba(11, 9, 6, 0.75) 80%,
              var(--bg) 100%
            );
        }
        .hero-inner {
          position: relative;
          z-index: 1;
        }
        h1 {
          font-family: var(--font-anton), Impact, sans-serif;
          font-weight: 400;
          font-size: clamp(26px, 8.4vw, 42px);
          line-height: 1;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
        }
        h1 .hl {
          color: var(--orange);
          text-shadow: 0 0 22px rgba(255, 106, 0, 0.45);
        }

        /* Passo a passo */
        .sec {
          padding: 0 16px;
        }
        .sec-t {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          text-align: center;
          margin-bottom: 10px;
        }
        .steps {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .step {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 13px;
          padding: 11px 13px;
        }
        /* linha ligando um passo no outro */
        .step::after {
          content: "";
          position: absolute;
          left: 26px;
          top: 100%;
          width: 2px;
          height: 10px;
          background: linear-gradient(180deg, rgba(255, 106, 0, 0.35), rgba(255, 106, 0, 0.06));
        }
        .step:last-child::after {
          display: none;
        }
        .n {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 106, 0, 0.14);
          border: 1px solid var(--border);
          color: var(--orange);
          font-family: var(--font-russo), sans-serif;
          font-size: 13px;
          line-height: 1;
        }
        .tx {
          min-width: 0;
        }
        .tx b {
          display: block;
          font-size: 14.5px;
          font-weight: 700;
          line-height: 1.2;
        }
        .tx span {
          display: block;
          font-size: 12px;
          line-height: 1.3;
          color: var(--muted);
          margin-top: 2px;
        }
        /* último passo = a recompensa, destacado em dourado */
        .step.prize {
          border-color: rgba(255, 197, 61, 0.35);
          background: linear-gradient(180deg, #1f1708 0%, #1a120a 100%);
        }
        .step.prize .n {
          background: rgba(255, 197, 61, 0.16);
          border-color: rgba(255, 197, 61, 0.35);
          color: var(--gold);
        }
        .step.prize .tx b {
          color: var(--gold);
        }

        /* Responsável / footer */
        .responsible {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 12px;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
        }
        .age {
          display: inline-grid;
          place-items: center;
          min-width: 28px;
          height: 20px;
          padding: 0 6px;
          border-radius: 6px;
          background: #c62828;
          color: #fff;
          font-weight: 800;
          font-size: 11px;
        }
        .fazenda {
          margin-top: 6px;
          font-size: 10.5px;
          font-weight: 600;
          line-height: 1.3;
          color: var(--muted);
          text-align: center;
        }
        .footer {
          font-size: 8.5px;
          line-height: 1.35;
          color: #5a5049;
          text-align: center;
          padding: 8px 16px 0;
        }

        /* CTA — última faixa da coluna, sempre visível sem rolar */
        .cta-bar {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
          background: rgba(11, 9, 6, 0.94);
          border-top: 1px solid var(--border);
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
        }
        .cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          white-space: nowrap;
          width: 100%;
          min-height: 56px;
          padding: 15px 18px;
          background: linear-gradient(180deg, #ff8524 0%, var(--orange) 60%, var(--orange-2) 100%);
          color: #1a0b00;
          font: 800 clamp(15px, 4.4vw, 18px) / 1 var(--font-barlow), sans-serif;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(255, 106, 0, 0.4);
          touch-action: manipulation;
          user-select: none;
          animation: breathe 2.2s ease-in-out infinite;
        }
        .cta:active:not(:disabled) {
          transform: scale(0.99);
          filter: brightness(0.97);
        }
        @keyframes breathe {
          0%, 100% { box-shadow: 0 10px 30px rgba(255, 106, 0, 0.4); transform: translateY(0); }
          50% { box-shadow: 0 14px 42px rgba(255, 106, 0, 0.6); transform: translateY(-2px); }
        }
        .cta.loading {
          background: linear-gradient(180deg, #3a2a1c 0%, #221810 100%);
          color: var(--text);
          cursor: wait;
          animation: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255, 255, 255, 0.25);
          border-top-color: var(--orange);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .cta-legal {
          font-size: 10.5px;
          color: var(--dim);
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .cta, .live { animation: none; }
        }

        /* Telas curtas: aperta o texto de apoio pra tudo continuar cabendo */
        @media (max-height: 680px) {
          .tx span { display: none; }
          .step { padding: 10px 13px; }
          .footer { display: none; }
          .responsible { margin-top: 10px; }
          .fazenda { margin-top: 4px; }
        }
      `}</style>
    </div>
  );
}
