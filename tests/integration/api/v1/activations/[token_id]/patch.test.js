import orchestrator from "@/tests/orchestrator.js";
import webserver from "@/infra/webserver.js";
import activation from "@/models/activation.js";

const activationsApiUrl = `${webserver.origin}/api/v1/activations`;
const userApiUrl = `${webserver.origin}/api/v1/user`;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

beforeEach(async () => {
  await orchestrator.deleteAllEmails();
});

describe("PATCH /api/v1/activations/[token_id]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent 'token'", async () => {
      const response = await fetch(
        `${activationsApiUrl}/00000000-0000-0000-0000-000000000000`,
        {
          method: "PATCH",
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O token de ativação não foi encontrado ou expirou.",
        action: "Faça um novo cadastro.",
        status_code: 404,
      });
    });

    test("With expired 'token'", async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - activation.EXPIRATION_IN_MILLISECONDS),
      });

      const createdUser = await orchestrator.createUser();
      const activationToken = await activation.create(createdUser.id);

      jest.useRealTimers();

      await activation.sendEmailToUser(createdUser, activationToken);
      const lastEmail = await orchestrator.getLastEmail();
      const activationTokenId = orchestrator.extractUUID(lastEmail.text);

      const response = await fetch(
        `${activationsApiUrl}/${activationTokenId}`,
        {
          method: "PATCH",
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O token de ativação não foi encontrado ou expirou.",
        action: "Faça um novo cadastro.",
        status_code: 404,
      });
    });

    test("With valid 'token'", async () => {
      const createdUser = await orchestrator.createUser();
      const activationToken = await activation.create(createdUser.id);
      await activation.sendEmailToUser(createdUser, activationToken);
      const lastEmail = await orchestrator.getLastEmail();
      const activationTokenId = orchestrator.extractUUID(lastEmail.text);

      const response = await fetch(
        `${activationsApiUrl}/${activationTokenId}`,
        {
          method: "PATCH",
        },
      );

      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual({
        id: responseBody.id,
        used_at: responseBody.used_at,
        user_id: createdUser.id,
        expires_at: responseBody.expires_at,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      expect(responseBody.used_at).not.toBe(null);
      expect(Date.parse(responseBody.used_at)).not.toBeNaN();
      expect(Date.parse(responseBody.expires_at)).not.toBeNaN();
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response2 = await fetch(userApiUrl, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response2.status).toBe(200);
      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
        features: ["create:session", "read:session"],
        created_at: createdUser.created_at.toISOString(),
        updated_at: response2Body.updated_at,
      });
    });
  });
});
