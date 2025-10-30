import migrationRunner from "node-pg-migrate";
import { join } from "path";
import database from "@/infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} not allowed.`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient,
      dryRun: request.method === "GET",
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const migrations = await migrationRunner(defaultMigrationOptions);
    const status = request.method === "POST" && migrations.length > 0 ? 201 : 200;
    return response.status(status).json(migrations);
  } catch (error) {
    console.error("Error during migrations:", error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
