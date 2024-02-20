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
const vscode = __importStar(require("vscode"));
const vsls = __importStar(require("vsls"));
const bonjour_1 = __importDefault(require("bonjour"));
const ws_1 = __importDefault(require("ws"));
const showInfo_1 = require("../messages/showInfo");
const updateStatus_1 = require("../views/updateStatus");
const validateShare_1 = require("./validateShare");
const comChannel = (0, bonjour_1.default)();
const serviceType = "FAST_SHARE";
let server = null;
const startServer = async () => {
    (0, updateStatus_1.updateStatus)("openConnectionStatus", "loading");
    const isServerOpen = await (0, validateShare_1.validateShare)();
    if (isServerOpen) {
        (0, showInfo_1.showInfo)("Ya hay una session en esta red");
        (0, updateStatus_1.updateStatus)("openConnectionStatus", "false");
        return;
    }
    else {
        (0, showInfo_1.showInfo)("Iniciando LiveShare");
        initWS();
        (0, updateStatus_1.updateStatus)("openConnectionStatus", "false");
    }
};
exports.startServer = startServer;
const initWS = async () => {
    server = new ws_1.default.Server({ port: 4000 });
    server.on("connection", (socket) => {
        (0, showInfo_1.showInfo)("Nuevo cliente conectado");
        socket.on("message", async (message) => {
            if (message.toString() === "REQUEST") {
                const generatedId = await getSessionId();
                socket.send(generatedId ? generatedId : "ERROR");
            }
        });
    });
    comChannel.publish({ name: "FastShare", type: serviceType, port: 4000 });
    await vscode.commands.executeCommand("liveshare.start");
};
const getSessionId = async () => {
    const liveshare = await vsls.getApi();
    const id = liveshare?.session.id;
    return id;
};
//# sourceMappingURL=index.js.map