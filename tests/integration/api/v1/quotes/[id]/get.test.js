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
    test("Retrive a quote by id", async () => {
      const randomQuote = await fetch(`${quotesUrl}`);
      const randomQuoteBody = await randomQuote.json();

      const response = await fetch(`${quotesUrl}/${randomQuoteBody.id}`);
      const responseBody = await response.json();

      expect(response.status).toBe(200);

      expect(responseBody).toEqual(
        expect.objectContaining({
          id: randomQuoteBody.id,
          emoji: expect.any(String),
          quote: expect.any(String),
          autor: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        }),
      );

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });

    test("With ID is invalid or not found", async () => {
      const invalidId = "12345678-1234-4234-8234-123456789012";
      const response = await fetch(`${quotesUrl}/${invalidId}`);

      expect(response.status).toBe(404);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "A citação não foi encontrada no sistema.",
        action: "Verifique se o ID da citação foi digitado corretamente.",
        status_code: 404,
      });
    });
  });
});
