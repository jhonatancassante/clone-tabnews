import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import user from "models/user.js";
import password from "models/password.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data.", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "jhonatanjb",
          email: "jhonatan.cassante@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "jhonatanjb",
        email: "jhonatan.cassante@live.com",
        password: responseBody.password,
        features: [],
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const userInDatabase = await user.findOneByUsername("jhonatanjb");
      const correctPasswordMatch = await password.compare(
        process.env.TEST_PASSWORD,
        userInDatabase.password,
      );

      expect(correctPasswordMatch).toBe(true);

      const incorrectPasswordMatch = await password.compare(
        process.env.TEST_PASSWORD + "errado",
        userInDatabase.password,
      );

      expect(incorrectPasswordMatch).toBe(false);
    });

    test("With duplicated 'email'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado1",
          email: "duplicado@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado2",
          email: "Duplicado@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        name: "ValidationError",
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With duplicated 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "usernameduplicado",
          email: "username1@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "UsernameDuplicado",
          email: "username2@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        name: "ValidationError",
        message: "O username informado já está sendo utilizado.",
        action: "Utilize outro username para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With null or empty 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: null,
          email: "nullUsername@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response1.status).toBe(400);

      const response1Body = await response1.json();
      expect(response1Body).toEqual({
        name: "ValidationError",
        message: `O campo username é obrigatório.`,
        action: `Forneça um campo username válido para realizar essa operação.`,
        status_code: 400,
      });

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "    ",
          email: "nullUsername@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "ValidationError",
        message: `O campo username é obrigatório.`,
        action: `Forneça um campo username válido para realizar essa operação.`,
        status_code: 400,
      });
    });

    test("With null or empty 'email'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullemail",
          email: null,
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response1.status).toBe(400);

      const response1Body = await response1.json();
      expect(response1Body).toEqual({
        name: "ValidationError",
        message: `O campo email é obrigatório.`,
        action: `Forneça um campo email válido para realizar essa operação.`,
        status_code: 400,
      });

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullemail",
          email: "        ",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "ValidationError",
        message: `O campo email é obrigatório.`,
        action: `Forneça um campo email válido para realizar essa operação.`,
        status_code: 400,
      });
    });

    test("With null or empty 'password'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullpassword",
          email: "nullpassword@live.com",
          password: null,
        }),
      });

      expect(response1.status).toBe(400);

      const response1Body = await response1.json();
      expect(response1Body).toEqual({
        name: "ValidationError",
        message: `O campo senha é obrigatório.`,
        action: `Forneça um campo senha válido para realizar essa operação.`,
        status_code: 400,
      });

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullpassword",
          email: "nullpassword@live.com",
          password: "     ",
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "ValidationError",
        message: `O campo senha é obrigatório.`,
        action: `Forneça um campo senha válido para realizar essa operação.`,
        status_code: 400,
      });
    });
  });
});
