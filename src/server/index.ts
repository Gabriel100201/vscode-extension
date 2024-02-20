import * as vscode from "vscode";
import * as vsls from "vsls";
import bonjour from "bonjour";
import WebSocket, { Server as WebSocketServer } from "ws";
import { showInfo } from "../messages/showInfo";
import { updateStatus } from "../views/updateStatus";
import { validateShare } from "./validateShare";

const comChannel = bonjour();
const serviceType = "FAST_SHARE";
let server: WebSocket.Server | null = null;

export const startServer = async () => {
  updateStatus("openConnectionStatus", "loading");
  const isServerOpen = await validateShare();
  if (isServerOpen) {
    showInfo("Ya hay una session en esta red");
    updateStatus("openConnectionStatus", "false");
    return;
  } else {
    showInfo("Iniciando LiveShare");
    initWS();
    updateStatus("openConnectionStatus", "false");
  }
};

const initWS = async () => {
  server = new WebSocket.Server({ port: 4000 });
  server.on("connection", (socket: WebSocket) => {
    showInfo("Nuevo cliente conectado");
    socket.on("message", async (message: WebSocket.Data) => {
      if (message.toString() === "REQUEST") {
        const generatedId = await getSessionId();
        socket.send(generatedId ? generatedId : "ERROR");
      }
    });
  });

  comChannel.publish({ name: "FastShare", type: serviceType, port: 4000 });
  await vscode.commands.executeCommand("liveshare.start");
};

const getSessionId = async () => {
  const liveshare = await vsls.getApi();
  const id = liveshare?.session.id;
  return id;
};
