// Instala el módulo 'ws' utilizando npm install ws
import * as vscode from "vscode";
import WebSocket, { Server as WebSocketServer } from "ws";

export const startServer = () => {
  // Se inicializa el servidor
  const server: WebSocketServer = new WebSocket.Server({ port: 4000 });
  // Notificacion de inicio
  vscode.window.showInformationMessage("Compartiendo liveShare");
  server.on("connection", (socket: WebSocket) => {
    // Notificacion de cliente conectado
    vscode.window.showInformationMessage("Nuevo cliente conectado");
    
    // Evento disparado cuando se recibe un mensaje
    socket.on("message", (message: WebSocket.Data) => {
      vscode.window.showInformationMessage(
        `Mensaje recibido: ${message.toString()}`
      );
      server.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });
};

// FACF356E6CC62F054743359707915C1E8BD4