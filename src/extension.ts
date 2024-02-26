import * as vscode from "vscode";
import { startServer } from "./server";
import { connectToWs } from "./client/connectToSession";
import { loadUsers } from "./views/loadUsers";
import { updateStatus } from "./views/updateStatus";
import { closeServer } from "./server/index";

// DEFINICIÓN DE VARIABLE GLOBAL
updateStatus("openConnectionStatus", "true");

export function activate(context: vscode.ExtensionContext) {
  let serverConfig = vscode.commands.registerCommand(
    "sugerencias.openServer",
    async () => {
      startServer();
    }
  );

  let endSession = vscode.commands.registerCommand(
    "sugerencias.closeServer",
    async () => {
      closeServer();
    }
  );

  let connectToCode = vscode.commands.registerCommand(
    "sugerencias.openConnection",
    (ipAddress) => {
      // Busca una session activa de liveShare
      connectToWs(ipAddress);
    }
  );

  let showUsers = vscode.commands.registerCommand(
    "sugerencias.showUserList",
    () => {
      loadUsers();
    }
  );

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(endSession);
  context.subscriptions.push(connectToCode);
  context.subscriptions.push(showUsers);

  vscode.commands.executeCommand("sugerencias.showUserList");
}
export function deactivate() {}
