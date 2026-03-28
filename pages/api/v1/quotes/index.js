import { createRouter } from "next-connect";
import controller from "@/infra/controller.js";
import quote from "@/models/quote.js";
import authorization from "@/models/authorization";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .get(getHandler)
  .handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userTryingToGet = request.context.user;
  const randomQuote = await quote.getOneRandomQuote();

  const secureOutputValues = authorization.filterOutput(
    userTryingToGet,
    "read:quote",
    randomQuote,
  );

  return response.status(200).json(secureOutputValues);
}
