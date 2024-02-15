import * as vscode from "vscode";
import bonjour from "bonjour";
import WebSocket from "ws";

const comChannel = bonjour();

const openSession = async (sessionId: string) => {
  const link = `vscode://ms-vsliveshare.vsliveshare/join?vslsLink=https://prod.liveshare.vsengsaas.visualstudio.com/join?${sessionId}`;
  const uriLink = vscode.Uri.parse(link);
  await vscode.env.openExternal(uriLink);
};

export const findSession = () => {
  comChannel.find({ type: "FAST_SHARE" }, function (service) {
    if (service.type === "FAST_SHARE") {
      const url = `ws://${service.referer.address}:${service.port}`;
      const ws = new WebSocket(url);

      ws.on("message", (data: WebSocket.Data) => {
        openSession(data.toString());
      });
    }
  });
};
