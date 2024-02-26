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
exports.loadUsers = void 0;
const vscode = __importStar(require("vscode"));
const bonjour_1 = __importDefault(require("bonjour"));
const userListProvider_1 = require("./userListProvider");
const direccionesIP = new Set();
const loadUsers = () => {
    vscode.window.createTreeView("treeUsers", {
        treeDataProvider: new userListProvider_1.UserListDataProvider([...direccionesIP]),
    });
};
exports.loadUsers = loadUsers;
const buscarServiciosfastshare = () => {
    const browser = (0, bonjour_1.default)().find({ type: "FAST_SHARE" });
    browser.on("down", (service) => {
        if (service.type === "FAST_SHARE") {
            console.log("SE ENCONTRO UN CIERRE SE SESION: ", service.addresses);
            let ipAddress;
            const ipV4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            if (ipV4Regex.test(service.addresses[0])) {
                ipAddress = service.addresses[0];
            }
            else {
                ipAddress = service.addresses[1];
            }
            // Buscar y eliminar la IP del conjunto direccionesIP
            const userToRemove = Array.from(direccionesIP).find((user) => user.ipAddress === ipAddress);
            if (userToRemove) {
                direccionesIP.delete(userToRemove);
                (0, exports.loadUsers)();
            }
        }
    });
    // Escuchar eventos de servicio
    browser.on("up", (service) => {
        if (service.type === "FAST_SHARE") {
            let ipAddress;
            const ipV4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            if (ipV4Regex.test(service.addresses[0])) {
                ipAddress = service.addresses[0];
            }
            else {
                ipAddress = service.addresses[1];
            }
            const nickname = service.txt.nickname;
            if (!direccionesIP.has({ ipAddress, nickname })) {
                direccionesIP.add({ ipAddress, nickname });
                (0, exports.loadUsers)();
            }
        }
    });
};
buscarServiciosfastshare();
//# sourceMappingURL=loadUsers.js.map