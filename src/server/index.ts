import * as vscode from "vscode";
import * as vsls from "vsls";
import bonjour from "bonjour";
import WebSocket from "ws";
import { showInfo } from "../messages/showInfo";
import { updateStatus } from "../views/updateStatus";
import { SessionIdManager, sessionIdType } from "../components/sessionId";

const comChannel = bonjour();
const serviceType = "FAST_SHARE";
let server: WebSocket.Server | null = null;

const initWS = async () => {
  server = new WebSocket.Server({ port: 4000 });
  server.on("connection", (socket: WebSocket) => {
    showInfo("Nuevo cliente conectado");
    socket.on("message", async (message: WebSocket.Data) => {
      if (message.toString() === "REQUEST") {
        const generatedId = SessionIdManager.instance.sessionId;
        socket.send(generatedId ? generatedId : "ERROR");
      }
    });
  });
};

const getSessionId = async () => {
  let id: sessionIdType;

  const livesharePromise = vsls
    .getApi()
    .then((liveshare) => liveshare?.session.id);
  const clipboardPromise = vscode.env.clipboard.readText();

  const result = await Promise.race([livesharePromise, clipboardPromise]);

  if (result) {
    if (result.startsWith("https")) {
      id = result;
    } else {
      const formattedId: sessionIdType = `https://prod.liveshare.vsengsaas.visualstudio.com/join?${result}`;
      id = formattedId;
    }
  } else {
    id = null;
  }

  console.log(id);
  return id;
};

// Inicializacion de LiveShare
export const startServer = async () => {
  updateStatus("openConnectionStatus", "loading");
  showInfo("Iniciando LiveShare");

  // Se inicia la session de live share y se guarda el id de manera global
  await vscode.commands.executeCommand("liveshare.start");
  SessionIdManager.instance.sessionId = await getSessionId();

  // Se inicia el Server de WebSocket y  se comunica por bonjour
  initWS();
  comChannel.publish({ name: "FastShare", type: serviceType, port: 4000 });

  updateStatus("openConnectionStatus", "false");
};
