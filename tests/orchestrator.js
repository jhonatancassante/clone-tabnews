import retry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "@/infra/database.js";
import migrator from "@/models/migrator.js";
import user from "@/models/user.js";
import seeder from "@/models/seeder.js";
import session from "@/models/session.js";
import activation from "@/models/activation.js";
import webserver from "@/infra/webserver.js";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`;

async function waitForAllServices() {
  await waitForWebService();
  await waitForEmailService();

  async function waitForWebService() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${webserver.origin}/api/v1/status`);

      if (!response.ok) {
        throw Error();
      }
    }
  }

  async function waitForEmailService() {
    return retry(fetchEmailPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchEmailPage() {
      const response = await fetch(emailHttpUrl);

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

async function activateUser(userObject) {
  return await activation.activateUserByUserId(userObject.id);
}

async function createSession(userObject) {
  return await session.create(userObject.id);
}

async function deleteAllEmails() {
  await fetch(`${emailHttpUrl}/messages`, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListResponse = await fetch(`${emailHttpUrl}/messages`);
  const emailListBody = await emailListResponse.json();
  const lastEmailItem = emailListBody.pop();

  if (!lastEmailItem) {
    return null;
  }

  const emailTextResponse = await fetch(
    `${emailHttpUrl}/messages/${lastEmailItem.id}.plain`,
  );
  const emailTextBody = await emailTextResponse.text();

  lastEmailItem.text = emailTextBody;
  return lastEmailItem;
}

function extractUUID(text) {
  const regex =
    /\/cadastro\/ativar\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12})/i;

  const matchedText = text.match(regex);

  return matchedText && matchedText[1] ? matchedText[1] : null;
}

async function addFeaturesToUser(userObject, features) {
  const updatedUser = await user.addFeatures(userObject.id, features);

  return updatedUser;
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  runQuotesSeeder,
  createUser,
  activateUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID,
  addFeaturesToUser,
};

export default orchestrator;
