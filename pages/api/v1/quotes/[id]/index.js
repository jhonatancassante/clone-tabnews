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
  const id = request.query.id;
  const quoteById = await quote.getOneQuoteById(id);

  const secureOutputValues = authorization.filterOutput(
    userTryingToGet,
    "read:quote",
    quoteById,
  );

  return response.status(200).json(secureOutputValues);
}
