"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const socket_1 = require("./server/socket");
function activate(context) {
    let serverConfig = vscode.commands.registerCommand("sugerencias.openServer", () => {
        // Se crea un server WS
        (0, socket_1.startServer)();
    });
    let connectToCode = vscode.commands.registerCommand("sugerencias.openConnection", () => {
        async function joinLiveShareSession(sessionId) {
            const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=https://prod.liveshare.vsengsaas.visualstudio.com/join?${sessionId}`;
            const uriLink = vscode.Uri.parse(link);
            await vscode.env.openExternal(uriLink);
        }
        joinLiveShareSession("4CDA819C42B36F157DB6E54E42AFB525FB58");
    });
    context.subscriptions.push(serverConfig);
    context.subscriptions.push(connectToCode);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map