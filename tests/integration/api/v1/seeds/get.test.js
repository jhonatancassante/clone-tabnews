import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/seeds", () => {
  describe("Anonymous user", () => {
    test("Retrieving seed status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/seeds/quotes");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const possibleMessages = [
        "Quotes haven’t been run yet.",
        "Quotes have already been run.",
      ];

      expect(possibleMessages).toContain(responseBody.message);
    });
  });
});
