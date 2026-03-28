import { createRouter } from "next-connect";
import controller from "@/infra/controller.js";
import quote from "@/models/quote.js";
import seeder from "@/models/seeder.js";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .get(controller.canRequest("read:seed"), getHandler)
  .post(controller.canRequest("create:seed"), postHandler)
  .handler(controller.errorHandlers);

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
