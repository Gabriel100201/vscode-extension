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
exports.startServer = exports.closeServer = void 0;
const vscode = __importStar(require("vscode"));
const vsls = __importStar(require("vsls"));
const bonjour_1 = __importDefault(require("bonjour"));
const ws_1 = __importDefault(require("ws"));
const showInfo_1 = require("../messages/showInfo");
const updateStatus_1 = require("../views/updateStatus");
const sessionId_1 = require("../constants/sessionId");
const getNickName_1 = require("./getNickName");
const comChannel = (0, bonjour_1.default)();
const serviceType = "FAST_SHARE";
let server = null;
const initWS = async () => {
    server = new ws_1.default.Server({ port: 4000 });
    server.on("connection", (socket) => {
        (0, showInfo_1.showInfo)("Nuevo cliente conectado");
        socket.on("message", async (message) => {
            if (message.toString() === "REQUEST") {
                const generatedId = sessionId_1.SessionIdManager.instance.sessionId;
                socket.send(generatedId ? generatedId : "ERROR");
            }
        });
    });
};
const getSessionId = async () => {
    let id;
    const livesharePromise = vsls
        .getApi()
        .then((liveshare) => liveshare?.session.id);
    const clipboardPromise = vscode.env.clipboard.readText();
    const result = await Promise.race([livesharePromise, clipboardPromise]);
    if (result) {
        if (result.startsWith("https")) {
            id = result;
        }
        else {
            const formattedId = `https://prod.liveshare.vsengsaas.visualstudio.com/join?${result}`;
            id = formattedId;
        }
    }
    else {
        id = null;
    }
    return id;
};
const closeServer = async () => {
    (0, updateStatus_1.updateStatus)("openConnectionStatus", "loading");
    await vscode.commands.executeCommand("liveshare.end");
    (0, updateStatus_1.updateStatus)("openConnectionStatus", "true");
    comChannel.unpublishAll();
    console.log("UNPUBLISH ADVICE");
};
exports.closeServer = closeServer;
// Inicializacion de LiveShare
const startServer = async () => {
    (0, updateStatus_1.updateStatus)("openConnectionStatus", "loading");
    (0, showInfo_1.showInfo)("Iniciando LiveShare");
    // Se inicia la session de live share y se guarda el id de manera global
    await vscode.commands.executeCommand("liveshare.start");
    sessionId_1.SessionIdManager.instance.sessionId = await getSessionId();
    // Se inicia el Server de WebSocket y  se comunica por bonjour
    initWS();
    comChannel.publish({
        name: "fastshare",
        type: serviceType,
        port: 4000,
        txt: { nickname: (0, getNickName_1.getNickName)() },
    });
    (0, updateStatus_1.updateStatus)("openConnectionStatus", "false");
};
exports.startServer = startServer;
//# sourceMappingURL=index.js.map