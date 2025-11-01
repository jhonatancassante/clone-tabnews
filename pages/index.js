import { useEffect, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("/100_quotes.json");
        const data = await res.json();
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setQuote(data[randomIndex]);
        }
      } catch (err) {
        console.error("Erro ao carregar as citações:", err);
      }
    }

    fetchQuote();
  }, []);

  return (
    <main className="container">
      {quote ? (
        <div className="quote-card">
          <p className="quote-text">
            {quote.id}. {quote.emoji} &quot;{quote.quote}&quot;
          </p>
          <p className="quote-author">— {quote.autor}</p>
        </div>
      ) : (
        <p className="loading">Carregando frase...</p>
      )}

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f3f4f6;
          padding: 1rem;
          text-align: center;
        }

        .quote-card {
          max-width: 700px;
          background: #ffffff;
          padding: 2rem 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .quote-text {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .quote-author {
          font-size: 1rem;
          color: #4b5563;
        }

        .loading {
          font-size: 1.1rem;
          color: #6b7280;
        }
      `}</style>
    </main>
  );
}
