import useSWR from "swr";

const REFRESH_INTERVAL = 0;

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: REFRESH_INTERVAL,
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const { updated_at: updatedAt, dependencies } = data;

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt updatedAt={updatedAt} />
      <DatabaseStatus database={dependencies.database} />
    </>
  );
}

export default StatusPage;

function Loading() {
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const backdropStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
  };

  const containerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "24px 32px",
    borderRadius: "16px",
  };

  const spinnerStyle = {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const textStyle = {
    color: "#fff",
    fontSize: "18px",
    fontWeight: 500,
  };

  return (
    <div role="status" aria-live="polite" style={overlayStyle}>
      <div style={backdropStyle} />

      <div style={containerStyle}>
        <div style={spinnerStyle} aria-hidden="true" />
        <span style={textStyle}>Carregando...</span>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

function UpdatedAt({ updatedAt }) {
  const updatedAtText = new Date(updatedAt).toLocaleString("pt-BR");

  return (
    <div>
      <strong>Última atualização:</strong> {updatedAtText}
    </div>
  );
}

function DatabaseStatus({ database }) {
  const {
    version,
    max_connections: maxConnections,
    opened_connections: openedConnections,
  } = database;

  return (
    <div>
      <h3>Dependências:</h3>
      <details open>
        <summary>
          <strong>Banco de dados</strong>
        </summary>
        <ul>
          <li>
            <strong>Versão:</strong> {version}
          </li>
          <li>
            <strong>Limite de Conexões:</strong> {maxConnections}
          </li>
          <li>
            <strong>Conexões abertas:</strong> {openedConnections}
          </li>
        </ul>
      </details>
    </div>
  );
}
