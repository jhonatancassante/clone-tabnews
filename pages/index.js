import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imagePath = "/ojhow.jpg";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f3f4f6",
        transition: "background-color 0.5s ease",
      }}
    >
      {!loaded && !error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            fontSize: "1rem",
            color: "#111827",
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          Carregando imagem...
        </div>
      )}

      {error && (
        <div
          style={{
            fontSize: "1rem",
            color: "red",
            textAlign: "center",
          }}
        >
          Erro ao carregar a imagem.
        </div>
      )}

      {!error && (
        <div
          style={{
            display: loaded ? "flex" : "none",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={imagePath}
            alt="Página do museu"
            width={200}
            height={300}
            onLoadingComplete={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{
              width: "auto",
              height: "90%",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "scale(1)" : "scale(1.02)",
              transition: "opacity 1.2s ease, transform 1.2s ease",
            }}
            priority
          />
          <div
            style={{
              display: "block",
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#4b5563",
              position: "relative",
            }}
          >
            <Link href="mailto:ojhow@ojhow.com.br">ojhow@ojhow.com.br</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
