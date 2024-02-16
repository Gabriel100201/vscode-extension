import bonjour from "bonjour";

const comChannel = bonjour();
const serviceType = "FAST_SHARE";

comChannel.publish({ name: "FastShare", type: serviceType, port: 4000 });
