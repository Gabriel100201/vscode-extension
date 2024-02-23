import * as vscode from "vscode";
import bonjour from "bonjour";
import { UserListDataProvider } from "./userListProvider";

interface UserInfo {
  ipAddress: string;
  nickname: string;
}

const direccionesIP: Set<UserInfo> = new Set();

export const loadUsers = () => {
  vscode.window.createTreeView("treeUsers", {
    treeDataProvider: new UserListDataProvider([...direccionesIP]),
  });
};

const buscarServiciosFastShare = () => {
  const browser = bonjour().find({ type: "FAST_SHARE" });

  // Escuchar eventos de servicio
  browser.on("up", (service) => {
    if (service.type === "FAST_SHARE") {
      const ipAddress = service.addresses[1];
      const nickname = service.txt.nickname;

      if (!direccionesIP.has({ ipAddress, nickname })) {
        direccionesIP.add({ ipAddress, nickname });
        loadUsers();
      }
    }
  });

};

buscarServiciosFastShare();