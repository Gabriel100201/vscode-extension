import * as vscode from "vscode";
import WebSocket, { Server as WebSocketServer } from "ws";
import { showInfo } from "../messages/showInfo";
import bonjour from "bonjour";

const comChannel = bonjour();
const serviceType = "FAST_SHARE";
let server: WebSocket.Server | null = null;

export const startServer = async () => {
  server = new WebSocket.Server({ port: 4000 });

  server.on("connection", (socket: WebSocket) => {
    showInfo("Nuevo cliente conectado");

    socket.on("message", (message: WebSocket.Data) => {
      if (message.toString() === "REQUEST") {
        const generatedId = getSessionId();
        socket.send(generatedId);
      }
    });
  });

  comChannel.publish({ name: "FastShare", type: serviceType, port: 4000 });

  await vscode.commands.executeCommand("liveshare.start");
};

const getSessionId = () => {
  const liveshareInfo = vscode.extensions.getExtension(
    "MS-vsliveshare.vsliveshare"
  );
  const sessionId = liveshareInfo?.exports.liveShareApis[0].session.id;
  return sessionId;
};
