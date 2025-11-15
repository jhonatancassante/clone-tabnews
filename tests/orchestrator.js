import retry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "@/infra/database.js";
import migrator from "@/models/migrator.js";
import user from "@/models/user.js";
import seeder from "@/models/seeder";
import session from "@/models/session";

const apiBaseUrl = "http://localhost:3000/api/v1";

async function waitForAllServices() {
  await waitForWebService();

  async function waitForWebService() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (!response.ok) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations(true);
}

async function runQuotesSeeder() {
  await seeder.runQuotesSeed(true);
}

async function createUser(userObject) {
  return await user.create({
    username:
      userObject?.username || faker.internet.username().replace(/[_.-]/g, ""),
    email: userObject?.email || faker.internet.email(),
    password: userObject?.password || process.env.TEST_PASSWORD,
  });
}

async function createSession(userId) {
  return await session.create(userId);
}

const orchestrator = {
  apiBaseUrl,
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  runQuotesSeeder,
  createUser,
  createSession,
};

export default orchestrator;
