import * as vscode from "vscode";
import { startServer } from "./server";
import { findSession } from "./client/connectToSession";
import { validateShare } from "./server/validateShare";
import { showInfo } from "./messages/showInfo";
import { loadUsers } from "./views/loadUsers";
import { updateStatus } from "./views/updateStatus";

updateStatus("openConnectionStatus", "true");

export function activate(context: vscode.ExtensionContext) {
  
  let serverConfig = vscode.commands.registerCommand(
    "sugerencias.openServer",
    async () => {
      updateStatus("openConnectionStatus", "loading");
      const isServerOpen = await validateShare();
      if (isServerOpen) {
        showInfo("Ya hay una session en esta red");
        updateStatus("openConnectionStatus", "false");
        return;
      } else {
        showInfo("Iniciando LiveShare");
        // Se crea un server WS
        startServer();
        updateStatus("openConnectionStatus", "false");
      }
    }
  );

  let connectToCode = vscode.commands.registerCommand(
    "sugerencias.openConnection",
    () => {
      // Busca una session activa de liveShare
      findSession();
    }
  );

  let showUsers = vscode.commands.registerCommand(
    "sugerencias.showUserList",
    () => {
      loadUsers();
    }
  );

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(connectToCode);
  context.subscriptions.push(showUsers);
}
export function deactivate() {}
