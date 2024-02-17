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
const server_1 = require("./server");
const connectToSession_1 = require("./client/connectToSession");
const validateShare_1 = require("./server/validateShare");
const showInfo_1 = require("./messages/showInfo");
const loadUsers_1 = require("./views/loadUsers");
const updateStatus_1 = require("./views/updateStatus");
(0, updateStatus_1.updateStatus)("openConnectionStatus", "true");
function activate(context) {
    let serverConfig = vscode.commands.registerCommand("sugerencias.openServer", async () => {
        (0, updateStatus_1.updateStatus)("openConnectionStatus", "loading");
        const isServerOpen = await (0, validateShare_1.validateShare)();
        if (isServerOpen) {
            (0, showInfo_1.showInfo)("Ya hay una session en esta red");
            (0, updateStatus_1.updateStatus)("openConnectionStatus", "false");
            return;
        }
        else {
            (0, showInfo_1.showInfo)("Iniciando LiveShare");
            // Se crea un server WS
            (0, server_1.startServer)();
            (0, updateStatus_1.updateStatus)("openConnectionStatus", "false");
        }
    });
    let connectToCode = vscode.commands.registerCommand("sugerencias.openConnection", () => {
        // Busca una session activa de liveShare
        (0, connectToSession_1.findSession)();
    });
    let showUsers = vscode.commands.registerCommand("sugerencias.showUserList", () => {
        (0, loadUsers_1.loadUsers)();
    });
    context.subscriptions.push(serverConfig);
    context.subscriptions.push(connectToCode);
    context.subscriptions.push(showUsers);
    vscode.commands.executeCommand("sugerencias.showUserList");
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map