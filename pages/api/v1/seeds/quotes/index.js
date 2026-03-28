import { createRouter } from "next-connect";
import controller from "@/infra/controller.js";
import quote from "@/models/quote.js";
import seeder from "@/models/seeder.js";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:seed"), getHandler);
router.post(controller.canRequest("create:seed"), postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const quotesCount = await quote.verify();

  const secureOutputValues = {
    message:
      quotesCount === 0
        ? "Quotes haven’t been run yet."
        : "Quotes have already been run.",
  };

  return response.status(200).json(secureOutputValues);
}

async function postHandler(request, response) {
  const quotesCount = await seeder.runQuotesSeed();

  let statusCode;
  let message;

  if (quotesCount < 0) {
    message = "Quotes have already been run.";
    statusCode = 200;
  } else {
    message = "All Quotes ran successfully.";
    statusCode = 201;
  }

  const secureOutputValues = {
    message,
    ...(quotesCount > 0 && { quotesCount }),
  };

  return response.status(statusCode).json(secureOutputValues);
}
