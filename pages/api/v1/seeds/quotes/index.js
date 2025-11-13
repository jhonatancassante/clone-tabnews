import { createRouter } from "next-connect";
import controller from "@/infra/controller.js";
import quote from "@/models/quote.js";
import seeder from "@/models/seeder.js";

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
  const quotesCount = await seeder.runQuotesSeed();

  if (quotesCount < 0) {
    return response.status(200).json({
      message: "Quotes have already been run.",
    });
  }

  return response.status(201).json({
    message: "All Quotes ran successfully.",
    quotesCount,
  });
}
