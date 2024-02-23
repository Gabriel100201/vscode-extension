import * as vscode from "vscode";
import bonjour from "bonjour";
import WebSocket from "ws";

let openConnectionButton: vscode.StatusBarItem | undefined;
let isConnectionButtonEnabled = true;

const comChannel = bonjour();
let existingWebSocket: WebSocket | null = null;

const openSession = async (sessionId: string) => {
  const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=${sessionId}`;
  const uriLink = vscode.Uri.parse(link);
  await vscode.env.openExternal(uriLink);
};

export const findSession = () => {
  comChannel.findOne({ type: "FAST_SHARE" }, function (service) {
    if (service && service.type === "FAST_SHARE") {
      const url = `ws://${service.referer.address}:${service.port}`;

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
    }
  });
};
