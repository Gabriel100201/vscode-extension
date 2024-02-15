import * as vscode from "vscode";
import { startServer } from "./server";
import { findSession } from "./client/connectToSession";
import { validateShare } from "./server/validateShare";
import { showInfo } from "./messages/showInfo";
/* import { validateShare } from "./server/validateShare"; */

export function activate(context: vscode.ExtensionContext) {
  let serverConfig = vscode.commands.registerCommand(
    "sugerencias.openServer",
    async () => {
      const isServerOpen = await validateShare();
      if (isServerOpen) {
        showInfo("Ya hay una session en esta red");
        return;
      } else {
        // Se crea un server WS
        startServer();
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

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(connectToCode);
}
export function deactivate() {}
