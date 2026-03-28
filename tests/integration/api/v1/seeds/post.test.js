import orchestrator from "tests/orchestrator.js";
import webserver from "@/infra/webserver.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

beforeEach(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/seeds/quotes", () => {
  describe("Anonymous user", () => {
    test("Running pending seeds", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/seeds/quotes`, {
        method: "POST",
      });
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        action: 'Verifique se o seu usuário possui a feature "create:seed".',
        message: "Você não possui permissão para executar esta ação.",
        name: "ForbiddenError",
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Running pending seeds", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/seeds/quotes`, {
        method: "POST",
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });
      expect(response.status).toBe(403);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        action: 'Verifique se o seu usuário possui a feature "create:seed".',
        message: "Você não possui permissão para executar esta ação.",
        name: "ForbiddenError",
        status_code: 403,
      });
    });
  });

  describe("Privileged user", () => {
    describe("Running pending seeds", () => {
      test("Run seeds successfully for the first time", async () => {
        const createdUser = await orchestrator.createUser();
        const activatedUser = await orchestrator.activateUser(createdUser);
        await orchestrator.addFeaturesToUser(createdUser, ["create:seed"]);
        const createdUserSession =
          await orchestrator.createSession(activatedUser);

        const response = await fetch(
          `${webserver.origin}/api/v1/seeds/quotes`,
          {
            method: "POST",
            headers: {
              Cookie: `session_id=${createdUserSession.token}`,
            },
          },
        );
        expect(response.status).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.message).toBe("All Quotes ran successfully.");
        expect(responseBody.quotesCount).toBeGreaterThan(0);
      });

      test("When seeds were already run", async () => {
        await orchestrator.runQuotesSeeder();

        const createdUser = await orchestrator.createUser();
        const activatedUser = await orchestrator.activateUser(createdUser);
        await orchestrator.addFeaturesToUser(createdUser, ["create:seed"]);
        const createdUserSession =
          await orchestrator.createSession(activatedUser);

        const secondResponse = await fetch(
          `${webserver.origin}/api/v1/seeds/quotes`,
          {
            method: "POST",
            headers: {
              Cookie: `session_id=${createdUserSession.token}`,
            },
          },
        );

        expect(secondResponse.status).toBe(200);

        const secondResponseBody = await secondResponse.json();
        expect(secondResponseBody.message).toBe(
          "Quotes have already been run.",
        );
      });
    });
  });
});
