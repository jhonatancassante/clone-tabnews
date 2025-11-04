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
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative flex flex-col items-center gap-3 px-6 py-8 rounded-2xl">
        <div
          className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white"
          aria-hidden="true"
        />

        <span className="text-white text-lg font-medium">Carregando...</span>
      </div>
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
