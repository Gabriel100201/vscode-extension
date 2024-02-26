"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bonjour_1 = __importDefault(require("bonjour"));
const comChannel = (0, bonjour_1.default)();
const serviceType = "FAST_SHARE";
comChannel.publish({ name: "fastshare", type: serviceType, port: 4000 });
//# sourceMappingURL=sendInfo.js.map