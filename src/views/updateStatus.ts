import * as vscode from "vscode";
type itemStatus = "true" | "false" | "loading";

export const updateStatus = (id: string, status: itemStatus) => {
  vscode.commands.executeCommand("setContext", id, status);
};
