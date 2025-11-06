import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "@/infra/database.js";
import { ServiceError } from "@/infra/errors";

const defaultMigrationOptions = {
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

/**
 * Executa ou lista migrações pendentes do banco de dados.
 *
 * Quando `applyMigrations` for `false` (padrão), a função apenas lista
 * as migrações pendentes (modo dry-run).
 * Quando `applyMigrations` for `true`, as migrações são aplicadas de fato.
 *
 * @async
 * @param {boolean} [applyMigrations=false] - Define se deve executar as migrações (true)
 * ou apenas listá-las (false).
 * @returns {Promise<Array>} Uma lista de migrações processadas.
 * @throws {Error} Caso haja erro ao conectar no banco de dados ou executar migrações.
 *
 * @example
 * // Lista migrações pendentes (sem aplicar)
 * const pendingMigrations = await migrator.runPendingMigrations();
 *
 * // Executa migrações
 * const migratedMigrations = await migrator.runPendingMigrations(true);
 */
async function runPendingMigrations(applyMigrations = false) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: !applyMigrations,
    });

    return migrations;
  } catch (error) {
    const serviceObjectError = new ServiceError({
      cause: error,
      message: `Erro ao ${applyMigrations ? "executar" : "listar"} as migrações do banco de dados.`,
    });
    throw serviceObjectError;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  runPendingMigrations,
};

export default migrator;

/*
async function listPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}
*/
