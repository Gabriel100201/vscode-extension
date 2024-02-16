import * as vscode from "vscode";
import { startServer } from "./server";
import { findSession } from "./client/connectToSession";
import { validateShare } from "./server/validateShare";
import { showInfo } from "./messages/showInfo";
import { NodeDependenciesProvider } from "./views/treeDataProvider";

export function activate(context: vscode.ExtensionContext) {
  const rootPath: any =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;
  vscode.window.registerTreeDataProvider(
    "nodeDependencies",
    new NodeDependenciesProvider(rootPath)
  );
  vscode.window.createTreeView("nodeDependencies", {
    treeDataProvider: new NodeDependenciesProvider(rootPath),
  });

  let serverConfig = vscode.commands.registerCommand(
    "sugerencias.openServer",
    async () => {
      const isServerOpen = await validateShare();
      if (isServerOpen) {
        showInfo("Ya hay una session en esta red");
        return;
      } else {
        showInfo("Iniciando LiveShare");
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
