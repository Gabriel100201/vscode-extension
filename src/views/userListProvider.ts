import * as vscode from "vscode";

export class UserListDataProvider implements vscode.TreeDataProvider<string> {
  iconPath = new vscode.ThemeIcon("account");

  constructor(private readonly users: any[]) {}

  getTreeItem(element: any): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(element.nickname);
    treeItem.iconPath = this.iconPath;
    treeItem.description = "Active";

    treeItem.command = {
      command: "sugerencias.openConnection",
      title: "Open User Session",
      arguments: [element.ipAddress],
    };

    return treeItem;
  }

  getChildren(): Thenable<string[]> {
    return Promise.resolve(this.users);
  }
}
