import database from "@/infra/database.js";
import { NotFoundError } from "@/infra/errors.js";

async function create(quoteInputValues) {
  const newQuote = await runInsertQuery(quoteInputValues);
  return newQuote;

  async function runInsertQuery(quoteInputValues) {
    const results = await database.query({
      text: `
          INSERT INTO
            quotes (emoji, quote, autor)
          VALUES
            ($1, $2, $3)
          RETURNING
            *
          ;`,
      values: [
        quoteInputValues.emoji,
        quoteInputValues.quote,
        quoteInputValues.autor,
      ],
    });
    return results.rows[0];
  }
}

async function verify() {
  const quotesCount = await runCountQuotes();
  return quotesCount;

  async function runCountQuotes() {
    const results = await database.query("SELECT COUNT(*) FROM quotes;");
    return parseInt(results.rows[0].count);
  }
}

async function getOneRandomQuote() {
  const randomQuote = await runGetOneRandomQuote();
  return randomQuote;

  async function runGetOneRandomQuote() {
    const results = await database.query(`
      SELECT
        *
      FROM
        quotes
      ORDER BY
        RANDOM()
      LIMIT
        1
    ;`);

    return results.rows[0];
  }
}

async function getOneQuoteById(id) {
  const quoteFound = await runSelectQuery();

  return quoteFound;

  async function runSelectQuery() {
    const results = await database.query({
      text: `
      SELECT
        *
      FROM
        quotes
      WHERE
        id = $1
      LIMIT
        1
    ;`,
      values: [id],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "A citação não foi encontrada no sistema.",
        action: "Verifique se o ID da citação foi digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

const quote = {
  create,
  verify,
  getOneRandomQuote,
  getOneQuoteById,
};

export default quote;
