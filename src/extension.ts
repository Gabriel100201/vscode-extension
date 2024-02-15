import * as vscode from "vscode";
import { startServer } from "./server/socket";

export function activate(context: vscode.ExtensionContext) {
  let serverConfig = vscode.commands.registerCommand(
    "sugerencias.openServer",
    () => {
      startServer();
      const showLiveShareInfo = async () => {
        await vscode.commands.executeCommand("liveshare.start");
        const liveshareInfo = vscode.extensions.getExtension(
          "MS-vsliveshare.vsliveshare"
        );
        vscode.window.showInformationMessage(
          JSON.stringify(liveshareInfo?.exports.liveShareApis[0].session.id)
        );
      };

      showLiveShareInfo();
    }
  );

  let connectToCode = vscode.commands.registerCommand(
    "sugerencias.openConnection",
    () => {
      async function joinLiveShareSession(sessionId: string) {

        const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=${sessionId}`;
        const uriLink = vscode.Uri.parse(link);
        vscode.window.showInformationMessage(uriLink.toString());
        await vscode.env.openExternal(uriLink);
      }
      joinLiveShareSession("https://prod.liveshare.vsengsaas.visualstudio.com/join?4CDA819C42B36F157DB6E54E42AFB525FB58");
    }
  );

  context.subscriptions.push(serverConfig);
  context.subscriptions.push(connectToCode);
}
export function deactivate() {}
