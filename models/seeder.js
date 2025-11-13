import quotesList from "@/pages/api/v1/seeds/quotes/quotes-list";
import quote from "@/models/quote.js";

async function runQuotesSeed(silent = false) {
  const quotesCount = await quote.verify();

  if (quotesCount > 0) {
    return -1;
  }

  const BATCH_SIZE = 100;
  let totalQuotesCount = 0;

  for (let i = 0; i < quotesList.length; i += BATCH_SIZE) {
    const batch = quotesList.slice(i, i + BATCH_SIZE);

    if (!silent) {
      console.log(
        `Processando lote ${Math.floor(i / BATCH_SIZE) + 1} de ${batch.length} citações...`,
      );
    }

    const insertionPromises = batch.map((quoteInputValues) => {
      return quote.create(quoteInputValues);
    });

    const createdQuotes = await Promise.all(insertionPromises);
    totalQuotesCount += createdQuotes.filter((q) => q).length;
  }

  return totalQuotesCount;
}

const seeder = {
  runQuotesSeed,
};

export default seeder;
