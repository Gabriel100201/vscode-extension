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

  // Cada vez que se conecta un cliente se activa esto
  server.on("connection", (socket: WebSocket) => {
    showInfo("Nuevo cliente conectado");

    server.clients.forEach((client) => {
      if (client !== socket) {
        client.send(getSessionId());
      }
    });
  });
};

const getSessionId = () => {
  const liveshareInfo = vscode.extensions.getExtension(
    "MS-vsliveshare.vsliveshare"
  );
  const sessionId = liveshareInfo?.exports.liveShareApis[0].session.id;
  return sessionId;
};
