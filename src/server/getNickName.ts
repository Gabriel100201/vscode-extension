import * as childProcess from "child_process";

export const getNickName = () => {
  let nickName;
  const result = childProcess.spawnSync("git", [
    "config",
    "--global",
    "user.name",
  ]);
  const nombreDeUsuario = result.stdout.toString().trim();

  if (nombreDeUsuario) {
    nickName = nombreDeUsuario;
  } else {
    nickName = "Guest";
  }
  return nickName;
};
