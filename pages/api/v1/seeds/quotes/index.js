import { createRouter } from "next-connect";
import controller from "@/infra/controller.js";
import quotesList from "./quotes-list.js";
import quote from "@/models/quote.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const quotesCount = await quote.verify();
  const message =
    quotesCount === 0
      ? "Quotes haven’t been run yet."
      : "Quotes have already been run.";

  return response.status(200).json({ message });
}

async function postHandler(request, response) {
  let quotesCount = await quote.verify();

  if (quotesCount > 0) {
    return response.status(200).json({
      message: "Quotes have already been run.",
      quotesCount,
    });
  }

  const BATCH_SIZE = 100;
  let totalQuotesCount = 0;

  for (let i = 0; i < quotesList.length; i += BATCH_SIZE) {
    const batch = quotesList.slice(i, i + BATCH_SIZE);

    console.log(
      `Processando lote ${Math.floor(i / BATCH_SIZE) + 1} de ${batch.length} citações...`,
    );

    const insertionPromises = batch.map((quoteInputValues) => {
      return quote.create(quoteInputValues);
    });

    const createdQuotes = await Promise.all(insertionPromises);
    totalQuotesCount += createdQuotes.filter((q) => q).length;
  }

  quotesCount = totalQuotesCount;

  return response.status(201).json({
    message: "All Quotes ran successfully.",
    quotesCount,
  });
}
