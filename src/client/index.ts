import WebSocket from "ws";

const url = "ws://localhost:4000";
const ws = new WebSocket(url);

/* ws.on("open", () => {
  ws.send("Hola, servidor!");
}); */

ws.on("message", (data: WebSocket.Data) => {
  console.log("Mensaje recibido:", data.toLocaleString());
});

ws.on("close", () => {
  console.log("Conexión cerrada.");
});

ws.on("error", (error: WebSocket.ErrorEvent) => {
  console.error("Error:", error.message);
});
