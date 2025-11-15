import orchestrator from "tests/orchestrator.js";

const seedQuotesUrl = `${orchestrator.apiBaseUrl}/seeds/quotes`;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

beforeEach(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/seeds/quotes", () => {
  describe("Anonymous user", () => {
    describe("Running pending seeds", () => {
      test("Run seeds successfully for the first time", async () => {
        const response = await fetch(seedQuotesUrl, { method: "POST" });
        const responseBody = await response.json();

        expect(response.status).toBe(201);
        expect(responseBody.message).toBe("All Quotes ran successfully.");
        expect(responseBody.quotesCount).toBeGreaterThan(0);
      });

      test("When seeds were already run", async () => {
        await orchestrator.runQuotesSeeder();

        const secondResponse = await fetch(seedQuotesUrl, { method: "POST" });
        const secondResponseBody = await secondResponse.json();

        expect(secondResponse.status).toBe(200);
        expect(secondResponseBody.message).toBe(
          "Quotes have already been run.",
        );
      });
    });
  });
});
