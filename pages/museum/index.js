import Link from "next/link";
import { useEffect, useState } from "react";

function Museum() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const pages = [
    {
      id: "001",
      title: "Primeira versão da página inicial",
      date: "23 de Outubro de 2025",
      description: "O início de tudo — simples, mas com uma brincadeira escondida.",
    },
    {
      id: "002",
      title: "Segunda versão da página inicial",
      date: "24 de Outubro de 2025",
      description: "Evolução funcional da bricadeira para ter compatibilidade no IOs.",
    },
    {
      id: "003",
      title: "Terceira versão da página inicial",
      date: "24 de Outubro de 2025",
      description: "Uma brincadeira remetendo a página www.pudim.com.br.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4rem 1rem",
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#1f2937",
          marginBottom: "2rem",
        }}
      >
        🏛️ Museu das Versões
      </h1>

      <p
        style={{
          color: "#4b5563",
          marginBottom: "3rem",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Aqui estão preservadas as versões antigas da página inicial —
        um registro das mudanças, do progresso e da beleza do tempo.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/museum/page-${page.id}`}
            style={{
              display: "block",
              backgroundColor: "#fff",
              borderRadius: "1rem",
              padding: "1.5rem",
              textDecoration: "none",
              color: "#111827",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)")
            }
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              {page.title}
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "0.5rem",
              }}
            >
              {page.date}
            </p>
            <p style={{ color: "#374151", lineHeight: "1.5" }}>
              {page.description}
            </p>
          </Link>
        ))}
      </div>

      <footer
        style={{
          marginTop: "4rem",
          color: "#9ca3af",
          fontSize: "0.875rem",
          textAlign: "center",
        }}
      >
        Preservar o passado é entender o caminho até aqui.
      </footer>
    </div>
  );
}

export default Museum;