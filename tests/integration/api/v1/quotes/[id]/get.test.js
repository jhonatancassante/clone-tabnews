import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.runQuotesSeeder();
});

describe("GET /api/v1/quotes", () => {
  describe("Anonymous user", () => {
    test("Retrive a quote by id", async () => {
      const randomQuote = await fetch("http://localhost:3000/api/v1/quotes");
      const randomQuoteBody = await randomQuote.json();

      const response = await fetch(
        `http://localhost:3000/api/v1/quotes/${randomQuoteBody.id}`,
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        emoji: responseBody.emoji,
        quote: responseBody.quote,
        autor: responseBody.autor,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });
  });
});
