import crypto from "node:crypto";
import database from "@/infra/database.js";
import { UnauthorizedError } from "@/infra/errors.js";

const EXPIRATION_IN_MILISECONDS = 60 * 60 * 24 * 30 * 1000; // 30 dias

async function create(userId) {
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = calculateExpirationDate();

  const newSession = await runInsertQuery(token, userId, expiresAt);
  return newSession;

  async function runInsertQuery(token, userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          sessions(token, user_id, expires_at)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
      ;`,
      values: [token, userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function findOneValidByToken(token) {
  const sessionFound = await runSelectQuery(token);

  return sessionFound;

  async function runSelectQuery(token) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          sessions
        WHERE
          token = $1
          AND expires_at > NOW()
        LIMIT 1
      ;`,
      values: [token],
    });

    if (results.rowCount === 0) {
      throw new UnauthorizedError({
        message: "Sessão inválida ou expirada.",
        action: "Faça login novamente para obter uma nova sessão.",
      });
    }

    return results.rows[0];
  }
}

async function renew(sessionId) {
  const newExpiresAt = calculateExpirationDate();
  const renewedSession = await runUpdateQuery(sessionId, newExpiresAt);
  return renewedSession;

  async function runUpdateQuery(sessionId, newExpiresAt) {
    const results = await database.query({
      text: `
        UPDATE
          sessions
        SET
          expires_at = $2,
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
      ;`,
      values: [sessionId, newExpiresAt],
    });

    return results.rows[0];
  }
}

async function expireById(sessionId) {
  const expiredSession = await runUpdateQuery(sessionId);
  return expiredSession;

  async function runUpdateQuery(sessionId) {
    const results = await database.query({
      text: `
        UPDATE
          sessions
        SET
          expires_at = expires_at - interval '1 year',
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
      ;`,
      values: [sessionId],
    });

    return results.rows[0];
  }
}

const session = {
  EXPIRATION_IN_MILISECONDS,
  create,
  findOneValidByToken,
  renew,
  expireById,
};

export default session;

function calculateExpirationDate() {
  return new Date(Date.now() + EXPIRATION_IN_MILISECONDS);
}
