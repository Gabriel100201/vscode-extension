import * as vscode from "vscode";
import WebSocket, { Server as WebSocketServer } from "ws";
import { showInfo } from "../messages/showInfo";
import bonjour from "bonjour";

const comChannel = bonjour();
const serviceType = "FAST_SHARE";

export const startServer = async () => {
  const server: WebSocketServer = new WebSocket.Server({ port: 4000 });
  comChannel.publish({ name: "FastShare", type: serviceType, port: 4000 });

  await vscode.commands.executeCommand("liveshare.start");
  showInfo("Compartiendo session");

  // Cada vez que se conecta un cliente se activa esto
  server.on("connection", (socket: WebSocket) => {
    showInfo("Nuevo cliente conectado");

    server.clients.forEach((client) => {
      client.send(getSessionId().toString());
      showInfo(getSessionId().toString());
    });

    /* socket.on("message", (message: WebSocket.Data) => {
      showInfo(`Mensaje recibido: ${message.toString()}`);
      server.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }); */
  });
};

const getSessionId = () => {
  const liveshareInfo = vscode.extensions.getExtension(
    "MS-vsliveshare.vsliveshare"
  );
  const sessionId = JSON.stringify(
    liveshareInfo?.exports.liveShareApis[0].session.id
  );
  return sessionId;
};
