import { runScript } from "./spawn.js";

(async function main() {
  runScript("dev:raw", {
    cleanup: true,
    afterExit: () => console.log("🏁 Processo principal encerrado."),
  });
})();
