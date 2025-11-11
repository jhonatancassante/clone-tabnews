import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import user from "models/user.js";
import password from "models/password.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent 'username'", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/UsuarioInexistente",
        {
          method: "PATCH",
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username não foi encontrado no sistema.",
        action: "Verifique se o username foi digitado corretamente.",
        status_code: 404,
      });
    });

    test("With null or empty 'username'", async () => {
      const createResponse = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullUsername",
          email: "nullUsername@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(createResponse.status).toBe(201);

      const response1 = await fetch(
        "http://localhost:3000/api/v1/users/nullUsername",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: null,
          }),
        },
      );

      expect(response1.status).toBe(400);

      const response1Body = await response1.json();
      expect(response1Body).toEqual({
        name: "ValidationError",
        message: "O campo username é obrigatório.",
        action: "Forneça um campo username válido para realizar essa operação.",
        status_code: 400,
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/nullUsername",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "   ",
          }),
        },
      );

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "ValidationError",
        message: "O campo username é obrigatório.",
        action: "Forneça um campo username válido para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With duplicated 'username'", async () => {
      const create1Response = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "user1",
            email: "user1@live.com",
            password: process.env.TEST_PASSWORD,
          }),
        },
      );

      expect(create1Response.status).toBe(201);

      const create2Response = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "user2",
            email: "user2@live.com",
            password: process.env.TEST_PASSWORD,
          }),
        },
      );

      expect(create2Response.status).toBe(201);

      const response = await fetch("http://localhost:3000/api/v1/users/user2", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O username informado já está sendo utilizado.",
        action: "Utilize outro username para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With null or empty 'email'", async () => {
      const createResponse = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullEmail",
          email: "nullEmail@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(createResponse.status).toBe(201);

      const response1 = await fetch(
        "http://localhost:3000/api/v1/users/nullEmail",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: null,
          }),
        },
      );

      expect(response1.status).toBe(400);

      const response1Body = await response1.json();
      expect(response1Body).toEqual({
        name: "ValidationError",
        message: "O campo email é obrigatório.",
        action: "Forneça um campo email válido para realizar essa operação.",
        status_code: 400,
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/nullEmail",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "   ",
          }),
        },
      );

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "ValidationError",
        message: "O campo email é obrigatório.",
        action: "Forneça um campo email válido para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With duplicated 'email'", async () => {
      const create1Response = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "email1",
            email: "email1@live.com",
            password: process.env.TEST_PASSWORD,
          }),
        },
      );

      expect(create1Response.status).toBe(201);

      const create2Response = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "email2",
            email: "email2@live.com",
            password: process.env.TEST_PASSWORD,
          }),
        },
      );

      expect(create2Response.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/email2",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "email1@live.com",
          }),
        },
      );

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With null or empty 'password'", async () => {
      const createResponse = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "nullPassword",
          email: "nullPassword@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(createResponse.status).toBe(201);

      const response1 = await fetch(
        "http://localhost:3000/api/v1/users/nullEmail",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: null,
          }),
        },
      );

      expect(response1.status).toBe(400);

      const response1Body = await response1.json();
      expect(response1Body).toEqual({
        name: "ValidationError",
        message: "O campo senha é obrigatório.",
        action: "Forneça um campo senha válido para realizar essa operação.",
        status_code: 400,
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/nullEmail",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: "   ",
          }),
        },
      );

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        name: "ValidationError",
        message: "O campo senha é obrigatório.",
        action: "Forneça um campo senha válido para realizar essa operação.",
        status_code: 400,
      });
    });

    test("With unique 'username'", async () => {
      const createResponse = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "uniqueUser1",
          email: "uniqueUser1@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(createResponse.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/uniqueUser1",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "uniqueUser2",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueUser2",
        email: "uniqueUser1@live.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With unique 'email'", async () => {
      const createResponse = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "uniqueEmail1",
          email: "uniqueEmail1@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(createResponse.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/uniqueEmail1",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "uniqueEmail2@live.com",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueEmail1",
        email: "uniqueEmail2@live.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new 'password'", async () => {
      const createResponse = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "newPassword",
          email: "newPassword@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(createResponse.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/newPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: process.env.TEST_PASSWORD + "new",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "newPassword",
        email: "newPassword@live.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const userInDatabase = await user.findOneByUsername("newPassword");
      const correctPasswordMatch = await password.compare(
        process.env.TEST_PASSWORD + "new",
        userInDatabase.password,
      );

      expect(correctPasswordMatch).toBe(true);

      const incorrectPasswordMatch = await password.compare(
        process.env.TEST_PASSWORD,
        userInDatabase.password,
      );

      expect(incorrectPasswordMatch).toBe(false);
    });

    test("With no match case in 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "updatenomatchcaseusername",
          email: "updatenomatchcaseusername@live.com",
          password: process.env.TEST_PASSWORD,
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/updatenomatchcaseusername",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "UpdateNoMatchCaseUsername",
          }),
        },
      );

      expect(response2.status).toBe(200);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "UpdateNoMatchCaseUsername",
        email: "updatenomatchcaseusername@live.com",
        password: response2Body.password,
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
      expect(response2Body.updated_at > response2Body.created_at).toBe(true);
    });
  });
});
