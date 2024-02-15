import * as vscode from "vscode";
import { startServer } from "./server/socket";
import { showInfo } from "./messages/startServer";

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
      async function joinLiveShareSession(sessionId: string) {
        const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=https://prod.liveshare.vsengsaas.visualstudio.com/join?${sessionId}`;
        const uriLink = vscode.Uri.parse(link);
        await vscode.env.openExternal(uriLink);
      }
      joinLiveShareSession("4CDA819C42B36F157DB6E54E42AFB525FB58");
    }
  );

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(connectToCode);
}
export function deactivate() {}
