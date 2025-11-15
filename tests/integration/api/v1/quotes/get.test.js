import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

const quotesUrl = `${orchestrator.apiBaseUrl}/quotes`;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.runQuotesSeeder();
});

describe("GET /api/v1/quotes", () => {
  describe("Anonymous user", () => {
    test("Retrive one random quote", async () => {
      const response = await fetch(quotesUrl);
      const quoteBody = await response.json();

      expect(response.status).toBe(200);
      expect(quoteBody).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          emoji: expect.any(String),
          quote: expect.any(String),
          autor: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        }),
      );

      expect(uuidVersion(quoteBody.id)).toBe(4);
      expect(Date.parse(quoteBody.created_at)).not.toBeNaN();
      expect(Date.parse(quoteBody.updated_at)).not.toBeNaN();
    });
  });
});
