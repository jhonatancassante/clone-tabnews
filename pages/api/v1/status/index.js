import { createRouter } from "next-connect";
import database from "@/infra/database";
import controller from "@/infra/controller";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const { rows: versionRows } = await database.query("SHOW server_version;");
  const databaseVersion = versionRows[0].server_version;

  const { rows: maxConnectionsRows } = await database.query(
    "SHOW max_connections;",
  );
  const maxConnections = parseInt(maxConnectionsRows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const { rows: openedConnectionsRows } = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnections = openedConnectionsRows[0].count;

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}
