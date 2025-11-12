import database from "@/infra/database.js";
import { ValidationError, NotFoundError } from "@/infra/errors.js";
import password from "@/models/password.js";

async function create(userInputValues) {
  validateRequiredField("username", userInputValues.username);
  await validateUnique("username", userInputValues.username);
  validateRequiredField("email", userInputValues.email);
  await validateUnique("email", userInputValues.email);
  validateRequiredField("senha", userInputValues.password);
  await hashPasswordInObject(userInputValues);

  const newUser = await runInsertQuery(userInputValues);
  return newUser;

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: `
          INSERT INTO
            users (username, email, password)
          VALUES
            ($1, $2, $3)
          RETURNING
            *
          ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return results.rows[0];
  }
}

async function findOneByUsername(username) {
  const userFound = await runSelectQuery(username);

  return userFound;

  async function runSelectQuery(username) {
    const results = await database.query({
      text: `
          SELECT
            *
          FROM
            users
          WHERE
            LOWER(username) = LOWER($1)
          LIMIT
            1
          ;`,
      values: [username],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O username não foi encontrado no sistema.",
        action: "Verifique se o username foi digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

async function findOneByEmail(email) {
  const userFound = await runSelectQuery(email);

  return userFound;

  async function runSelectQuery(email) {
    const results = await database.query({
      text: `
          SELECT
            *
          FROM
            users
          WHERE
            LOWER(email) = LOWER($1)
          LIMIT
            1
          ;`,
      values: [email],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O email não foi encontrado no sistema.",
        action: "Verifique se o email foi digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

async function update(username, userInputValues) {
  const currentUser = await findOneByUsername(username);

  if ("username" in userInputValues) {
    validateRequiredField("username", userInputValues.username);

    if (username.toLowerCase() !== userInputValues.username.toLowerCase()) {
      await validateUnique("username", userInputValues.username);
    }
  }

  if ("email" in userInputValues) {
    validateRequiredField("email", userInputValues.email);
    await validateUnique("email", userInputValues.email);
  }

  if ("password" in userInputValues) {
    validateRequiredField("senha", userInputValues.password);
    await hashPasswordInObject(userInputValues);
  }

  const userWithNewValues = { ...currentUser, ...userInputValues };

  const updatedUser = await runUpdateQuery(userWithNewValues);
  return updatedUser;

  async function runUpdateQuery(userWithNewValues) {
    const results = await database.query({
      text: `
        UPDATE
          users
        SET
          username = $2,
          email = $3,
          password = $4,
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
      ;`,
      values: [
        userWithNewValues.id,
        userWithNewValues.username,
        userWithNewValues.email,
        userWithNewValues.password,
      ],
    });

    return results.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
  findOneByEmail,
  update,
};

export default user;

function validateRequiredField(fieldName, fieldValue) {
  if (
    !fieldValue ||
    typeof fieldValue !== "string" ||
    fieldValue.trim().length === 0
  ) {
    throw new ValidationError({
      message: `O campo ${fieldName} é obrigatório.`,
      action: `Forneça um campo ${fieldName} válido para realizar essa operação.`,
    });
  }
}

async function validateUnique(fieldName, fieldValue) {
  const results = await database.query({
    text: `
      SELECT
        ${fieldName}
      FROM
        users
      WHERE
        LOWER(${fieldName}) = LOWER($1)
    ;`,
    values: [fieldValue],
  });

  if (results.rowCount > 0) {
    throw new ValidationError({
      message: `O ${fieldName} informado já está sendo utilizado.`,
      action: `Utilize outro ${fieldName} para realizar essa operação.`,
    });
  }
}

async function hashPasswordInObject(userInputValues) {
  const hashedPassword = await password.hash(userInputValues.password);
  userInputValues.password = hashedPassword;
}
