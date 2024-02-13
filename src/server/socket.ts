// Instala el módulo 'ws' utilizando npm install ws
import * as vscode from "vscode";
import WebSocket, { Server as WebSocketServer } from "ws";

export const startServer = () => {
  vscode.window.showInformationMessage("Ingreso a la funcion");
  const server: WebSocketServer = new WebSocket.Server({ port: 3000 });
  server.on("connection", (socket: WebSocket) => {
    vscode.window.showInformationMessage("Cliente conectado");

    socket.on("message", (message: WebSocket.Data) => {
      vscode.window.showInformationMessage(`Mensaje recibido: ${message.toString()}`);

      // Enviar el mensaje a todos los clientes conectados
      server.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });
};
