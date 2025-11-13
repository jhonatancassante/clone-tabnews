import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/seeds", () => {
  describe("Anonymous user", () => {
    describe("Running pending seeds", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/seeds/quotes",
          {
            method: "POST",
          },
        );
        expect(response.status).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.message).toBe("All Quotes ran successfully.");
        expect(responseBody.quotesCount).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/seeds/quotes",
          {
            method: "POST",
          },
        );
        expect(response.status).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.message).toBe("Quotes have already been run.");
      });
    });
  });
});
