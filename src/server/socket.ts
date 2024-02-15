import * as vscode from "vscode";
import WebSocket, { Server as WebSocketServer } from "ws";
import { showInfo } from "../messages/startServer";

export const startServer = async () => {
  await vscode.commands.executeCommand("liveshare.start");
  showInfo("Compartiendo session");
  showInfo(getSessionId());

  const server: WebSocketServer = new WebSocket.Server({ port: 4000 });

  // Cada vez que se conecta un cliente se activa esto
  server.on("connection", (socket: WebSocket) => {
    showInfo("Nuevo cliente conectado");

    socket.on("message", (message: WebSocket.Data) => {
      showInfo(`Mensaje recibido: ${message.toString()}`);
      server.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
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
