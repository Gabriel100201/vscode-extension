import * as vscode from "vscode";

export const showInfo = (message: string) => {
  vscode.window.showInformationMessage(message);
};