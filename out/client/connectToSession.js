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
exports.connectToWs = exports.openSession = void 0;
const vscode = __importStar(require("vscode"));
const bonjour_1 = __importDefault(require("bonjour"));
const ws_1 = __importDefault(require("ws"));
let openConnectionButton;
let isConnectionButtonEnabled = true;
const comChannel = (0, bonjour_1.default)();
let existingWebSocket = null;
const openSession = async (sessionId) => {
    const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=${sessionId}`;
    const uriLink = vscode.Uri.parse(link);
    await vscode.env.openExternal(uriLink);
};
exports.openSession = openSession;
const connectToWs = async (ip) => {
    const url = `ws://${ip}:4000`;
    // Cerrar la conexión existente antes de crear una nueva
    if (existingWebSocket) {
        existingWebSocket.close();
        existingWebSocket = null;
    }
    existingWebSocket = new ws_1.default(url);
    existingWebSocket.on("open", () => {
        existingWebSocket?.send("REQUEST");
    });
    existingWebSocket.on("message", (data) => {
        (0, exports.openSession)(data.toString());
        if (openConnectionButton && isConnectionButtonEnabled) {
            openConnectionButton.command = undefined;
            isConnectionButtonEnabled = false;
        }
    });
    existingWebSocket.on("close", () => {
        existingWebSocket = null;
    });
};
exports.connectToWs = connectToWs;
/* export const findSession = () => {
  comChannel.findOne({ type: "FAST_SHARE" }, function (service) {
    if (service && service.type === "FAST_SHARE") {
      const url = `ws://${service.referer.address}:${service.port}`;

      // Cerrar la conexión existente antes de crear una nueva
      if (existingWebSocket) {
        existingWebSocket.close();
        existingWebSocket = null;
      }

      existingWebSocket = new WebSocket(url);

      existingWebSocket.on("open", () => {
        existingWebSocket?.send("REQUEST");
      });

      existingWebSocket.on("message", (data: WebSocket.Data) => {
        openSession(data.toString());

        if (openConnectionButton && isConnectionButtonEnabled) {
          openConnectionButton.command = undefined;
          isConnectionButtonEnabled = false;
        }
      });

      existingWebSocket.on("close", () => {
        existingWebSocket = null;
      });
    }
  });
};
 */ 
//# sourceMappingURL=connectToSession.js.map