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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
// Instala el módulo 'ws' utilizando npm install ws
const vscode = __importStar(require("vscode"));
const ws_1 = __importDefault(require("ws"));
const startServer = () => {
    // Se inicializa el servidor
    const server = new ws_1.default.Server({ port: 4000 });
    // Notificacion de inicio
    vscode.window.showInformationMessage("Compartiendo liveShare");
    server.on("connection", (socket) => {
        // Notificacion de cliente conectado
        vscode.window.showInformationMessage("Nuevo cliente conectado");
        // Evento disparado cuando se recibe un mensaje
        socket.on("message", (message) => {
            vscode.window.showInformationMessage(`Mensaje recibido: ${message.toString()}`);
            server.clients.forEach((client) => {
                if (client !== socket && client.readyState === ws_1.default.OPEN) {
                    client.send(message);
                }
            });
        });
    });
};
exports.startServer = startServer;
// FACF356E6CC62F054743359707915C1E8BD4
//# sourceMappingURL=socket.js.map