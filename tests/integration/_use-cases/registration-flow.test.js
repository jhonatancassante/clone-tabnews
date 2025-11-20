import activation from "@/models/activation";
import orchestrator from "@/tests/orchestrator.js";
import webserver from "@/infra/webserver.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration Flow (all successful)", () => {
  let createUserResponseBody;

  test("Create user account", async () => {
    const createUserResponse = await fetch(
      "http://localhost:3000/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "RegistrationFlow",
          email: "registration.flow@test.com",
          password: process.env.TEST_PASSWORD,
        }),
      },
    );
    createUserResponseBody = await createUserResponse.json();

    expect(createUserResponse.status).toBe(201);
    expect(createUserResponseBody).toEqual({
      id: createUserResponseBody.id,
      username: "RegistrationFlow",
      email: "registration.flow@test.com",
      password: createUserResponseBody.password,
      features: ["read:activation_token"],
      created_at: createUserResponseBody.created_at,
      updated_at: createUserResponseBody.updated_at,
    });
  });

  test("Receive activation e-mail", async () => {
    const lastEmail = await orchestrator.getLastEmail();
    const activationTokenId = orchestrator.extractUUID(lastEmail.text);
    const userActivationToken =
      await activation.findOneValidById(activationTokenId);

    expect(lastEmail.sender).toBe("<contato@ojhow.com.br>");
    expect(lastEmail.recipients[0]).toBe("<registration.flow@test.com>");
    expect(lastEmail.subject).toBe("Ative seu cadastro em O Jhow!");
    expect(lastEmail.text).toContain("RegistrationFlow");
    expect(lastEmail.text).toContain(
      `${webserver.origin}/cadastro/ativar/${activationTokenId}`,
    );
    expect(userActivationToken.user_id).toBe(createUserResponseBody.id);
    expect(userActivationToken.used_at).toBe(null);
  });

  //TODO test("Activate account", async () => {});

  //TODO test("Login", async () => {});

  //TODO test("Get user information", async () => {});
});
