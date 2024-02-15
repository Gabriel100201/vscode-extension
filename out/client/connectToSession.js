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
const vscode = __importStar(require("vscode"));
const bonjour_1 = __importDefault(require("bonjour"));
const ws_1 = __importDefault(require("ws"));
const comChannel = (0, bonjour_1.default)();
const openSession = async (sessionId) => {
    const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=https://prod.liveshare.vsengsaas.visualstudio.com/join?${sessionId}`;
    const uriLink = vscode.Uri.parse(link);
    await vscode.env.openExternal(uriLink);
};
const findSession = () => {
    comChannel.find({ type: "FAST_SHARE" }, function (service) {
        if (service.type === "FAST_SHARE") {
            const url = `ws://${service.referer.address}:${service.port}`;
            const ws = new ws_1.default(url);
            ws.on("message", (data) => {
                openSession(data.toString());
            });
        }
    });
};
findSession();
//# sourceMappingURL=connectToSession.js.map