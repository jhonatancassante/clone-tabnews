import { createRouter } from "next-connect";
import controller from "@/infra/controller";
import migrator from "@/models/migrator";
import authorization from "@/models/authorization";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .get(controller.canRequest("read:migration"), getHandler)
  .post(controller.canRequest("create:migration"), postHandler)
  .handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userTryingToGet = request.context.user;
  const pendingMigrations = await migrator.runPendingMigrations(false);

  const secureOutputValues = authorization.filterOutput(
    userTryingToGet,
    "read:migration",
    pendingMigrations,
  );

  return response.status(200).json(secureOutputValues);
}

async function postHandler(request, response) {
  const userTryingToPost = request.context.user;

  const migratedMigrations = await migrator.runPendingMigrations(true);
  const statusCode = migratedMigrations.length > 0 ? 201 : 200;

  const secureOutputValues = authorization.filterOutput(
    userTryingToPost,
    "read:migration",
    migratedMigrations,
  );

  return response.status(statusCode).json(secureOutputValues);
}
