import dedent from "dedent";

import email from "@/infra/email.js";
import database from "@/infra/database.js";
import webserver from "@/infra/webserver.js";
import { ForbiddenError, NotFoundError } from "@/infra/errors.js";
import user from "@/models/user.js";
import authorization from "./authorization.js";

const EXPIRATION_IN_MILLISECONDS = 15 * 60 * 1000; //15 minutos

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          user_activation_tokens (user_id, expires_at)
        VALUES
          ($1, $2)
        RETURNING
          *
      ;`,
      values: [userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "O Jhow <contato@ojhow.com.br>",
    to: user.email,
    subject: "Ative seu cadastro em O Jhow!",
    text: dedent`${user.username}, clique no link abaixo para ativar seu cadastro em O Jhow:

    ${webserver.origin}/cadastro/ativar/${activationToken.id}

    Atenciosamente,
    Equipe O Jhow
    `,
  });
}

async function findOneValidById(tokenId) {
  const tokenFound = await runSelectQuery(tokenId);

  return tokenFound;

  async function runSelectQuery(tokenId) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          user_activation_tokens
        WHERE
          id = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        LIMIT 1
      ;`,
      values: [tokenId],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O token de ativação não foi encontrado ou expirou.",
        action: "Faça um novo cadastro.",
      });
    }

    return results.rows[0];
  }
}

async function markTokenAsUsed(activationTokenId) {
  const usedActivationToken = await runUpdateQuery(activationTokenId);
  return usedActivationToken;

  async function runUpdateQuery(activationTokenId) {
    const results = await database.query({
      text: `
        UPDATE
          user_activation_tokens
        SET
          used_at = timezone('utc', now()),
          updated_at = timezone('utc', now())
        WHERE
          id = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        RETURNING
          *
      ;`,
      values: [activationTokenId],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O token de ativação não foi encontrado ou expirou.",
        action: "Faça um novo cadastro.",
      });
    }

    return results.rows[0];
  }
}

async function activateUserByUserId(userId) {
  const userToActivate = await user.findOneById(userId);

  if (!authorization.can(userToActivate, "read:activation_token")) {
    throw new ForbiddenError({
      message: "Você não pode mais utilizar tokens de ativação.",
      action: "Entre em contato com o suporte.",
    });
  }

  const activatedUser = await user.setFeatures(userId, [
    "create:session",
    "read:session",
    "update:user",
  ]);
  return activatedUser;
}

const activation = {
  EXPIRATION_IN_MILLISECONDS,
  create,
  sendEmailToUser,
  findOneValidById,
  markTokenAsUsed,
  activateUserByUserId,
};

export default activation;
