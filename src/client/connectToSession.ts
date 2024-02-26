import * as vscode from "vscode";
import WebSocket from "ws";

let openConnectionButton: vscode.StatusBarItem | undefined;
let isConnectionButtonEnabled = true;

let existingWebSocket: WebSocket | null = null;

export const openSession = async (sessionId: string) => {
  const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=${sessionId}`;
  const uriLink = vscode.Uri.parse(link);
  await vscode.env.openExternal(uriLink);
};

export const connectToWs = async (ip: string) => {
  const url = `ws://${ip}:4000`;

  // Cerrar la conexión existente antes de crear una nueva
  if (existingWebSocket) {
    existingWebSocket.close();
    existingWebSocket = null;
  }

  existingWebSocket = new WebSocket(url);

  existingWebSocket.on("open", () => {
    existingWebSocket?.send("REQUEST");
  });

  existingWebSocket.on("message", (data: WebSocket.Data) => {
    openSession(data.toString());

    if (openConnectionButton && isConnectionButtonEnabled) {
      openConnectionButton.command = undefined;
      isConnectionButtonEnabled = false;
    }
  });

  existingWebSocket.on("close", () => {
    existingWebSocket = null;
  });
};