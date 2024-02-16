import WebSocket from "ws";
import bonjour from "bonjour";

const comChannel = bonjour();

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
