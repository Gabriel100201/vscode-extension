import * as vscode from "vscode";
import WebSocket, { Server as WebSocketServer } from "ws";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("sugerencias.twComplete", () => {
      const server: WebSocketServer = new WebSocket.Server({ port: 4000 });
      server.on("connection", (socket: WebSocket) => {
        vscode.window.showInformationMessage("Nuevo cliente conectado");

        socket.on("message", (message: WebSocket.Data) => {
          vscode.window.showInformationMessage(
            `Mensaje recibido: ${message.toString()}`
          );

          // Enviar el mensaje a todos los clientes conectados
          server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        });
      });
    }

  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
