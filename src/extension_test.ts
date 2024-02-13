import axios, { AxiosError, AxiosResponse } from "axios";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "sugerencias.twComplete",
    () => {
      axios("https://dog.ceo/api/breeds/image/random")
        .then((res: AxiosResponse) => {
          vscode.window.showInformationMessage(
            `Respuesta recibida ${JSON.stringify(res.data.message)}`
          );
        })
        .catch((err: AxiosError) => {
          vscode.window.showErrorMessage(`Error en la solicitud: ${err}`);
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
