const { spawn } = require("node:child_process");

function npmBin() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function spawnCmd(cmd, args = [], opts = {}) {
  const child = spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    ...opts,
  });

  child.on("error", (err) => {
    console.error(`❌ Erro ao iniciar ${cmd}:`, err);
  });

  return child;
}

async function cleanServices() {
  return new Promise((resolve) => {
    console.log(`🧹 Encerrando serviços...`);
    const stop = spawnCmd(npmBin(), ["run", "services:stop"]);
    let resolved = false;

    const finish = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);
      return resolve();
    };

    const timeout = setTimeout(() => {
      console.warn(
        "⚠️ Tempo esgotado ao tentar encerrar serviços, forçando término.",
      );
      stop.kill("SIGKILL");
      finish();
    }, 60000);

    stop.on("exit", (code) => {
      if (code === 0) console.log("✅ Serviços finalizados com sucesso!");
      else console.error(`⚠️ Serviços encerraram com código ${code}`);

      finish();
    });
  });
}

function runScript(script, options = {}) {
  const { cleanup, afterExit } = options;
  let cleanupCalled = false;

  const proc = spawnCmd(npmBin(), ["run", script]);

  async function handleCleanup() {
    if (cleanupCalled) return;
    cleanupCalled = true;

    if (cleanup) await cleanServices();
    if (afterExit) afterExit();
  }

  process.on("SIGINT", () => {
    console.log("🛑 Interrompendo por SIGINT");
    proc.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    console.log("🛑 Interrompendo por SIGTERM");
    proc.kill("SIGTERM");
  });

  proc.on("exit", async (code) => {
    await handleCleanup();

    process.exit(code ?? 0);
  });

  return proc;
}

module.exports = { runScript };
