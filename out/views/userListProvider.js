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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListDataProvider = void 0;
const vscode = __importStar(require("vscode"));
class UserListDataProvider {
    users;
    iconPath = new vscode.ThemeIcon("account");
    constructor(users) {
        this.users = users;
    }
    getTreeItem(element) {
        const treeItem = new vscode.TreeItem(element.nickname);
        treeItem.iconPath = this.iconPath;
        treeItem.description = "Active";
        treeItem.command = {
            command: "sugerencias.openConnection",
            title: "Open User Session",
            arguments: [element.ipAddress],
        };
        return treeItem;
    }
    getChildren() {
        return Promise.resolve(this.users);
    }
}
exports.UserListDataProvider = UserListDataProvider;
//# sourceMappingURL=userListProvider.js.map