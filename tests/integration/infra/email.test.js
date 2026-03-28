import email from "@/infra/email.js";
import orchestrator from "@/tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "O Jhow <contato@ojhow.com.br>",
      to: "jhonatan.cassante@live.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "O Jhow <contato@ojhow.com.br>",
      to: "jhonatan.cassante@live.com",
      subject: "Último Email enviado",
      text: "Corpo do último email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@ojhow.com.br>");
    expect(lastEmail.recipients[0]).toBe("<jhonatan.cassante@live.com>");
    expect(lastEmail.subject).toBe("Último Email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
