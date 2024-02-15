import * as vscode from "vscode";
import { startServer } from "./server/socket";
import { showInfo } from "./messages/showInfo";
import { findSession } from "./client/connectToSession";

export function activate(context: vscode.ExtensionContext) {
  let serverConfig = vscode.commands.registerCommand(
    "sugerencias.openServer",
    () => {
      // Se crea un server WS
      startServer();
    }
  );

  let connectToCode = vscode.commands.registerCommand(
    "sugerencias.openConnection",
    () => {
      // Busca una session activa de liveShare
      findSession();
    }
  );

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(connectToCode);
}
export function deactivate() {}
