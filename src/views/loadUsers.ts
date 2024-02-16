import * as vscode from "vscode";
import { UserListDataProvider } from "./userListProvider";

export const loadUsers = async () => {
  try {
    const users = ["Gabriel Funes", "Fabricio Castro"];

    vscode.window.createTreeView("treeUsers", {
      treeDataProvider: new UserListDataProvider(users),
    });
  } catch (error: any) {
    vscode.window.showErrorMessage(
      `Error al obtener la lista de usuarios: ${error.message}`
    );
  }
};
