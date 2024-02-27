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
const index_js_1 = require("./server/index.js");
const connectToSession_js_1 = require("./client/connectToSession.js");
const loadUsers_js_1 = require("./views/loadUsers.js");
const updateStatus_js_1 = require("./views/updateStatus.js");
const index_js_2 = require("./server/index.js");
// DEFINICIÓN DE VARIABLE GLOBAL
(0, updateStatus_js_1.updateStatus)("openConnectionStatus", "true");
function activate(context) {
    let serverConfig = vscode.commands.registerCommand("fastshare.openServer", async () => {
        (0, index_js_1.startServer)();
    });
    let endSession = vscode.commands.registerCommand("fastshare.closeServer", async () => {
        (0, index_js_2.closeServer)();
    });
    let connectToCode = vscode.commands.registerCommand("fastshare.openConnection", (ipAddress) => {
        // Busca una session activa de liveShare
        (0, connectToSession_js_1.connectToWs)(ipAddress);
    });
    let showUsers = vscode.commands.registerCommand("fastshare.showUserList", () => {
        (0, loadUsers_js_1.loadUsers)();
    });
    context.subscriptions.push(serverConfig);
    context.subscriptions.push(endSession);
    context.subscriptions.push(connectToCode);
    context.subscriptions.push(showUsers);
    vscode.commands.executeCommand("fastshare.showUserList");
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map