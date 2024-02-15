"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const url = "ws://localhost:4000";
const ws = new ws_1.default(url);
/* ws.on("open", () => {
  ws.send("Hola, servidor!");
}); */
ws.on("message", (data) => {
    console.log("Mensaje recibido:", data);
});
ws.on("close", () => {
    console.log("Conexión cerrada.");
});
ws.on("error", (error) => {
    console.error("Error:", error.message);
});
//# sourceMappingURL=index.js.map