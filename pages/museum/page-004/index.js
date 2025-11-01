// pages/index.js
export default function UnderConstruction() {
  return (
    <main className="wrap" role="main" aria-labelledby="title">
      <div className="card" aria-live="polite">
        <h1 id="title" className="title">
          Em Construção
        </h1>

        <p className="subtitle">
          Estamos lapidando este cantinho com carinho. Volte logo — vai ficar
          lindo.
        </p>

        <p className="meta">
          Precisa falar com a gente?{" "}
          <a href="mailto:ojhow@ojhow.com.br">jhonatan.cassante@live.com.br</a>
        </p>

        <div className="ornament" aria-hidden="true">
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
        </div>
      </div>

      <style jsx>{`
        :root {
          --bg: #f7f8fb;
          --card: #ffffff;
          --muted: #6b7280;
          --accent: #0ea5a4;
          --shadow: 0 8px 30px rgba(16, 24, 40, 0.08);
          --rounded: 14px;
        }

        * {
          box-sizing: border-box;
        }

        .wrap {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 2rem;
          background: linear-gradient(180deg, var(--bg), #eef2ff 60%);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .card {
          width: min(720px, 94vw);
          background: linear-gradient(180deg, var(--card), #fbfdff);
          border-radius: var(--rounded);
          box-shadow: var(--shadow);
          padding: 2.2rem 2.4rem;
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .title {
          margin: 0;
          font-size: clamp(1.45rem, 3.6vw, 2.4rem);
          letter-spacing: -0.02em;
          color: #0f172a;
          line-height: 1;
          font-weight: 700;
          transform-origin: center;
          animation: float 6s ease-in-out infinite;
        }

        .subtitle {
          margin: 0.9rem 0 1.25rem;
          color: var(--muted);
          font-size: 1rem;
        }

        .meta {
          margin: 0;
          color: var(--muted);
          font-size: 0.95rem;
        }

        .meta a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
        }
        .meta a:focus,
        .meta a:hover {
          text-decoration: underline;
        }

        .ornament {
          position: absolute;
          right: -26px;
          top: -18px;
          display: flex;
          gap: 8px;
          transform: rotate(-12deg);
        }

        .dot {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 30%, #fff, rgba(255, 255, 255, 0.6)),
            linear-gradient(180deg, #ffd6a5, #fb7185);
          box-shadow: 0 6px 18px rgba(16, 24, 40, 0.08);
          opacity: 0.95;
        }

        .dot-1 {
          transform: scale(1.15);
          background: linear-gradient(180deg, #c7f9f1, #34d399);
        }
        .dot-2 {
          transform: scale(0.95);
          background: linear-gradient(180deg, #fee2b3, #f97316);
        }
        .dot-3 {
          transform: scale(1.05);
          background: linear-gradient(180deg, #e9d5ff, #a78bfa);
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .title {
            animation: none;
          }
        }

        @media (max-width: 420px) {
          .card {
            padding: 1.6rem;
            border-radius: 12px;
          }
          .ornament {
            right: -18px;
            top: -12px;
          }
        }
      `}</style>
    </main>
  );
}
