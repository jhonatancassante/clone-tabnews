import { createRouter } from "next-connect";
import controller from "@/infra/controller.js";
import quote from "@/models/quote.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const id = request.query.id;
  const quoteById = await quote.getOneQuoteById(id);

  return response.status(200).json(quoteById);
}
