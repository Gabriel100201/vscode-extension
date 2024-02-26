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
    "fastshare.openServer",
    async () => {
      startServer();
    }
  );

  let endSession = vscode.commands.registerCommand(
    "fastshare.closeServer",
    async () => {
      closeServer();
    }
  );

  let connectToCode = vscode.commands.registerCommand(
    "fastshare.openConnection",
    (ipAddress) => {
      // Busca una session activa de liveShare
      connectToWs(ipAddress);
    }
  );

  let showUsers = vscode.commands.registerCommand(
    "fastshare.showUserList",
    () => {
      loadUsers();
    }
  );

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(endSession);
  context.subscriptions.push(connectToCode);
  context.subscriptions.push(showUsers);

  vscode.commands.executeCommand("fastshare.showUserList");
}
export function deactivate() {}
