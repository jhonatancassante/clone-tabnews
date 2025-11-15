import orchestrator from "tests/orchestrator.js";

const seedQuotesUrl = `${orchestrator.apiBaseUrl}/seeds/quotes`;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/seeds", () => {
  describe("Anonymous user", () => {
    test("Retrieving seed status without ran seeds", async () => {
      const response = await fetch(`${seedQuotesUrl}`);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.message).toBe("Quotes haven’t been run yet.");
    });

    test("Retrieving seed status with ran seeds", async () => {
      await orchestrator.runQuotesSeeder();

      const response = await fetch(`${seedQuotesUrl}`);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.message).toBe("Quotes have already been run.");
    });
  });
});
