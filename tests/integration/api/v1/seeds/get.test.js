import orchestrator from "tests/orchestrator.js";
import webserver from "@/infra/webserver.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/seeds/quotes", () => {
  describe("Anonymous user", () => {
    test("Retrieving seed status", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/seeds/quotes`);
      expect(response.status).toBe(403);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        action: 'Verifique se o seu usuário possui a feature "read:seed".',
        message: "Você não possui permissão para executar esta ação.",
        name: "ForbiddenError",
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Retrieving seed status", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/seeds/quotes`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });
      expect(response.status).toBe(403);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        action: 'Verifique se o seu usuário possui a feature "read:seed".',
        message: "Você não possui permissão para executar esta ação.",
        name: "ForbiddenError",
        status_code: 403,
      });
    });
  });

  describe("Privileged user", () => {
    test("Retrieving seed status without ran seeds", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      await orchestrator.addFeaturesToUser(createdUser, ["read:seed"]);
      const createdUserSession =
        await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/seeds/quotes`, {
        headers: {
          Cookie: `session_id=${createdUserSession.token}`,
        },
      });
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toEqual({ message: "Quotes haven’t been run yet." });
    });

    test("Retrieving seed status with ran seeds", async () => {
      await orchestrator.runQuotesSeeder();
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      await orchestrator.addFeaturesToUser(createdUser, ["read:seed"]);
      const createdUserSession =
        await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/seeds/quotes`, {
        headers: {
          Cookie: `session_id=${createdUserSession.token}`,
        },
      });
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        message: "Quotes have already been run.",
      });
    });
  });
});
