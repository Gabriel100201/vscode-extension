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

const buscarServiciosfastshare = () => {
  const browser = bonjour().find({ type: "FAST_SHARE" });

  browser.on("down", (service) => {
    if (service.type === "FAST_SHARE") {
      console.log("SE ENCONTRO UN CIERRE SE SESION: ", service.addresses);
      let ipAddress: string | undefined;

      const ipV4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
      if (ipV4Regex.test(service.addresses[0])) {
        ipAddress = service.addresses[0];
      } else {
        ipAddress = service.addresses[1];
      }

      // Buscar y eliminar la IP del conjunto direccionesIP
      const userToRemove = Array.from(direccionesIP).find(
        (user) => user.ipAddress === ipAddress
      );

      if (userToRemove) {
        direccionesIP.delete(userToRemove);
        loadUsers();
      }
    }
  });

  // Escuchar eventos de servicio
  browser.on("up", (service) => {
    if (service.type === "FAST_SHARE") {
      let ipAddress: string | undefined;

      const ipV4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
      if (ipV4Regex.test(service.addresses[0])) {
        ipAddress = service.addresses[0];
      } else {
        ipAddress = service.addresses[1];
      }
      const nickname = service.txt.nickname;

      if (!direccionesIP.has({ ipAddress, nickname })) {
        direccionesIP.add({ ipAddress, nickname });
        loadUsers();
      }
    }
  });
};

buscarServiciosfastshare();
