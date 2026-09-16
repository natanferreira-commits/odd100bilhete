"use client";

import { useState } from "react";

// ============================================================
// CONFIG — Ajustar antes de deployar
// ============================================================
const WHATSAPP_NUMERO = "5511999999999"; // formato E.164, sem + nem espaços
const WHATSAPP_MENSAGEM = "Oi! Quero pegar a odd 100 da Esportiva 🎯";
const LOADING_MS = 1000; // tempo do loading antes de redirecionar
// ============================================================

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
      WHATSAPP_MENSAGEM
    )}`;

    setTimeout(() => {
      window.location.href = url;
    }, LOADING_MS);
  };

  return (
    <main className="page">
      <div className="container">
        {/* Selo topo */}
        <div className="tag">
          <span className="pulse-dot" />
          LIBERADO AGORA
        </div>

        {/* Headline */}
        <h1 className="headline">
          ODD <span className="odd-value">100</span>
          <span className="headline-sub">no bilhete de hoje</span>
        </h1>

        {/* Print do bilhete Esportiva */}
        <div className="bilhete">
          <img
            src="/bilhete.jpeg"
            alt="Bilhete Esportiva Bet — Atlético-MG x Santos, cotação 100,15"
            className="bilhete-img"
          />
        </div>

        {/* CTA */}
        <button
          className={`cta ${loading ? "loading" : ""}`}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              <span>Preparando teu bilhete…</span>
            </>
          ) : (
            <>
              <span>QUERO PEGAR AGORA</span>
              <span className="arrow">→</span>
            </>
          )}
        </button>

        {/* Micro reforço */}
        <p className="micro">
          ⚡ Vaga limitada · Liberado por tempo curto
        </p>
      </div>

      {/* Footer compliance */}
      <footer className="footer">
        +18 · Aposte com responsabilidade · Ministério da Fazenda adverte:
        aposta não é investimento.
      </footer>

      <style jsx>{`
        .page {
          min-height: 100dvh;
          background:
            radial-gradient(1200px 600px at 50% -10%, rgba(255, 106, 0, 0.25), transparent 60%),
            radial-gradient(800px 400px at 50% 110%, rgba(255, 106, 0, 0.15), transparent 60%),
            #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 32px 20px 24px;
        }

        .container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 480px;
          text-align: center;
          gap: 24px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255, 106, 0, 0.15);
          border: 1px solid rgba(255, 106, 0, 0.4);
          color: #ffb380;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ff6a00;
          box-shadow: 0 0 12px #ff6a00;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .headline {
          font-size: clamp(48px, 12vw, 84px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #fff;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .odd-value {
          display: inline-block;
          color: #ff6a00;
          text-shadow:
            0 0 20px rgba(255, 106, 0, 0.6),
            0 0 40px rgba(255, 106, 0, 0.3);
        }

        .headline-sub {
          display: block;
          font-size: clamp(18px, 4.5vw, 24px);
          font-weight: 600;
          color: #d4d4d4;
          margin-top: 12px;
          letter-spacing: -0.01em;
        }

        .bilhete {
          width: 100%;
          max-width: 340px;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.5),
            0 0 0 3px rgba(255, 106, 0, 0.5),
            0 0 40px rgba(255, 106, 0, 0.35);
          margin: 4px 0;
          animation: bilhete-in 0.6s ease-out 0.1s both;
        }

        .bilhete-img {
          display: block;
          width: 100%;
          height: auto;
        }

        @keyframes bilhete-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .cta {
          width: 100%;
          padding: 22px 28px;
          border-radius: 16px;
          background: linear-gradient(180deg, #ff8524 0%, #ff6a00 100%);
          color: #0a0a0a;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow:
            0 8px 24px rgba(255, 106, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative;
          overflow: hidden;
        }

        .cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          animation: shine 2.6s ease-in-out infinite;
        }

        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          40%, 60% { transform: translateX(100%); }
        }

        .cta:active:not(:disabled) {
          transform: scale(0.98);
          box-shadow:
            0 4px 12px rgba(255, 106, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .cta.loading {
          background: linear-gradient(180deg, #444 0%, #2a2a2a 100%);
          color: #fff;
          cursor: wait;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .cta.loading::before {
          display: none;
        }

        .arrow {
          font-size: 22px;
          line-height: 1;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ff6a00;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .micro {
          font-size: 12px;
          color: #808080;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .footer {
          font-size: 10px;
          color: #666;
          text-align: center;
          line-height: 1.5;
          max-width: 480px;
          padding-top: 24px;
          border-top: 1px solid #1f1f1f;
          margin-top: 24px;
          width: 100%;
        }
      `}</style>
    </main>
  );
}
