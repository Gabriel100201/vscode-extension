import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('sugerencias.twComplete', () => {
		vscode.window.showInformationMessage('Hello World from sugerencias!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}