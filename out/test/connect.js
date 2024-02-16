"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bonjour_1 = __importDefault(require("bonjour"));
const comChannel = (0, bonjour_1.default)();
const findSession = () => {
    comChannel.find({ type: "FAST_SHARE" }, function (service) {
        console.log(service);
        /* if (service.type === "FAST_SHARE") {
          const url = `ws://${service.referer.address}:${service.port}`;
          const ws = new WebSocket(url);
    
          ws.on("message", (data: WebSocket.Data) => {
            console.log(data.toString());
          });
        } */
    });
};
findSession();
//# sourceMappingURL=connect.js.map