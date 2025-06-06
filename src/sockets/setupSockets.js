import { WebSocketServer } from "ws";
import { getAllUsers } from "../services/pessoaJava.js";

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  console.log("WebSocketServer criado e ligado ao servidor HTTP");

  wss.on("connection", (ws) => {
    console.log("Cliente conectado via WebSocket");

    let intervalId = null;

    ws.on("message", async (message) => {
      console.log("Mensagem recebida do cliente:", message.toString());

      try {
        const data = JSON.parse(message);

        switch (data.type) {
          case "PessoaJava":
            if (intervalId) {
              console.log("Intervalo já está rodando para esse cliente");
              break;
            }

            console.log("Iniciando envio periódico para PessoaJava");

            intervalId = setInterval(async () => {
              try {
                const response = await getAllUsers();
                ws.send(JSON.stringify({ type: "PessoaJava", data: response }));
                console.log("Enviado dados PessoaJava para o cliente");
              } catch (err) {
                console.error("Erro ao enviar dados periódicos:", err);
              }
            }, 5000);
            break;

          default:
            console.log("Tipo de mensagem desconhecido:", data.type);
            ws.send(JSON.stringify({ type: "error", message: "Tipo desconhecido" }));
            break;
        }
      } catch (err) {
        console.error("Erro ao processar mensagem:", err);
        ws.send(JSON.stringify({ type: "error", message: "JSON inválido" }));
      }
    });

    ws.on("close", () => {
      console.log("Cliente desconectado");
      if (intervalId) clearInterval(intervalId);
    });

    ws.on("error", (err) => {
      console.error("Erro no WebSocket do cliente:", err);
      if (intervalId) clearInterval(intervalId);
    });
  });
}
