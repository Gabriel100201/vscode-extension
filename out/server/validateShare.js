"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateShare = void 0;
const bonjour_1 = __importDefault(require("bonjour"));
const comChannel = (0, bonjour_1.default)();
const validateShare = async () => {
    return new Promise((resolve) => {
        let findTimeout;
        let isServerOpen = false;
        // Activar temporizador por 3 segundos
        findTimeout = setTimeout(() => {
            comChannel.destroy();
            resolve(isServerOpen);
        }, 3000);
        comChannel.find({ type: "FAST_SHARE" }, function (service) {
            if (!isServerOpen) {
                isServerOpen = true;
                comChannel.destroy();
                clearTimeout(findTimeout);
                resolve(isServerOpen);
            }
        });
    });
};
exports.validateShare = validateShare;
//# sourceMappingURL=validateShare.js.map