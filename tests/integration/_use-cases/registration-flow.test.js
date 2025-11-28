import activation from "@/models/activation.js";
import orchestrator from "@/tests/orchestrator.js";
import webserver from "@/infra/webserver.js";
import user from "@/models/user.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration Flow (all successful)", () => {
  let createUserResponseBody;
  let activationTokenId;
  let activatedUser;
  let createSessionResponseBody;

  test("Create user account", async () => {
    const createUserResponse = await fetch(`${webserver.origin}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "RegistrationFlow",
        email: "registration.flow@test.com",
        password: process.env.TEST_PASSWORD,
      }),
    });
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
    activationTokenId = orchestrator.extractUUID(lastEmail.text);
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

  test("Activate account", async () => {
    const activationResponse = await fetch(
      `${webserver.origin}/api/v1/activations/${activationTokenId}`,
      {
        method: "PATCH",
      },
    );
    const activationResponseBody = await activationResponse.json();

    expect(activationResponse.status).toBe(200);
    expect(Date.parse(activationResponseBody.used_at)).not.toBeNaN();

    activatedUser = await user.findOneByUsername("RegistrationFlow");
    expect(activatedUser.features).toEqual(["create:session", "read:session"]);
  });

  test("Login", async () => {
    const createSessionResponse = await fetch(
      `${webserver.origin}/api/v1/sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "registration.flow@test.com",
          password: process.env.TEST_PASSWORD,
        }),
      },
    );
    createSessionResponseBody = await createSessionResponse.json();

    expect(createSessionResponse.status).toBe(201);
    expect(createSessionResponseBody.user_id).toBe(createUserResponseBody.id);
  });

  test("Get user information", async () => {
    const response = await fetch(`${webserver.origin}/api/v1/user`, {
      headers: {
        Cookie: `session_id=${createSessionResponseBody.token}`,
      },
    });

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(createUserResponseBody.id);
  });
});
