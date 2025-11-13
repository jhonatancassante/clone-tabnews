import database from "@/infra/database.js";

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

const quote = {
  create,
  verify,
};

export default quote;
